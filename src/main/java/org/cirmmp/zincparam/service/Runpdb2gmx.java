package org.cirmmp.zincparam.service;

import org.apache.commons.lang3.RandomStringUtils;
import org.cirmmp.zincparam.model.Retpdb;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;


import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class Runpdb2gmx {
    Logger logger = LoggerFactory.getLogger(Runamber2pdb.class);

    @Value("${directory.tmp}/")
    private String tmpdir;

    public Retpdb run(List<String> cutspdb) throws Exception {

        Resource expect = new ClassPathResource("script/script.exp");
        String expectfile = expect.getFilename();

        logger.info("GROMCAS Resources");
        logger.info(expectfile);
        //InputStream input = resource.getInputStream();

        File dir = new File(this.tmpdir);
        if (!dir.exists()) dir.mkdirs();

        File file_expectS = expect.getFile();
        File file_expectD = new File(tmpdir + "script.exp");

        if (!file_expectD.exists()) {
            Files.copy(file_expectS.toPath(), file_expectD.toPath());
        }

        List<String> outpdb = new ArrayList<>();

        List<String> infoout = new ArrayList<>();

        String generatedStringrandom =  RandomStringUtils.randomAlphanumeric(10);
        String generatedString = this.tmpdir + generatedStringrandom;

        Files.write(Paths.get(generatedString + ".pdb"), cutspdb);

        //List<String> cmdexe = Arrays.asList("/bin/bash", "/Users/andrea/runpdb4amb.bash" );
        List<String> cmdexe = Arrays.asList("docker", "run", "-v",this.tmpdir+":/work", "gromacsexpect", "/usr/bin/expect", "script.exp", generatedStringrandom, generatedStringrandom+"_out");

        //List<String> cmdexe = Arrays.asList("/usr/bin/expect", "script.exp", generatedString, generatedString+"_out" );
        //List<String> cmdexe = Arrays.asList("gmx","pdb2gmx", "-f",generatedString,"-o",generatedString+".gro","-water","none","-q",generatedString+".pdb");
        //List<String> cmdexe = Arrays.asList("/bin/sh","-c","ls ..");
        cmdexe.forEach(a -> logger.info(a));
        logger.info(String.join(" ", cmdexe));
        ProcessBuilder processBuilder = new ProcessBuilder();

        processBuilder.command(cmdexe);

        processBuilder.directory(dir);

        //processBuilder.directory(new File(System.getProperty("user.home")));
        int exitCode = 100;

        Process process = processBuilder.start();
        //processBuilder.redirectErrorStream(true);
        System.out.println("\nPartito ---------> : ");
        // blocked :(
        BufferedReader readerp =
                new BufferedReader(new InputStreamReader(process.getInputStream()));

        BufferedReader errorreader =
                new BufferedReader(new InputStreamReader(process.getErrorStream()));

        String line ;
        System.out.println("\nPartito 2 ---------> : ");
        while ((line = readerp.readLine()) != null) {
            System.out.println(line);
            infoout.add(line);
        }

        String lineerror;
        System.out.println("\nPartito ERROR ---------> : ");
        while ((lineerror = errorreader.readLine()) != null) {
            System.out.println(lineerror);
            infoout.add(lineerror);
        }

        errorreader.close();
        readerp.close();

        exitCode = process.waitFor();
        System.out.println("\nExited with error code : " + exitCode);

        //delete temporaryfllr

        //Files.delete(Paths.get(generatedString));

        Stream<Path> walk = Files.walk(Paths.get(tmpdir));
        List<String> result = walk.filter(Files::isRegularFile)
                .map(x -> x.toString()).collect(Collectors.toList());

        logger.info(generatedString+"_out.pdb");
        Boolean cont = result.contains(generatedString+"_out.pdb");
        logger.info("CONTAIN");
        logger.info(String.valueOf(cont));
        result.forEach(System.out::println);
        if (cont) {
            outpdb = Files.readAllLines(Paths.get(generatedString + "_out.pdb"));
        } else {
            exitCode = 400;
        }

        outpdb.forEach(a -> logger.info(a));
        Retpdb retpdb = new Retpdb();
        retpdb.setExitcode(exitCode);
        retpdb.setPdbout(outpdb);
        retpdb.setInfoout(infoout);
        return retpdb;
    }

}
