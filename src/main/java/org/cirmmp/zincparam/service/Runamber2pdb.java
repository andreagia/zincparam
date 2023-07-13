package org.cirmmp.zincparam.service;

import org.apache.commons.lang3.RandomStringUtils;
import org.cirmmp.zincparam.model.Retpdb;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class Runamber2pdb {

    Logger logger = LoggerFactory.getLogger(Runamber2pdb.class);

    @Value("${directory.tmp}")
    private String tmpdir;

    @Value("${directory.amberhome}")
    private String amberhome;

    public Retpdb run(List<String> cutspdb) throws Exception {


        logger.info("AMBERHOME:"+amberhome);
        //List<String> outpdb = new ArrayList<>();

        List<String> infoout = new ArrayList<>();
        String randomstring =  RandomStringUtils.randomAlphanumeric(10);
        String generatedString = this.tmpdir + randomstring+ ".pdb";
        String pdbgeneratedString = randomstring+ ".pdb";
        String pdboutgeneratedString = randomstring+ "_out.pdb";
        String filepdboutgeneratedString =  this.tmpdir + randomstring+ "_out.pdb";
        logger.info("Input pdb");
        logger.info(generatedString);
        File file = new File(".");
        logger.debug(file.getAbsolutePath());
        //cutspdb.forEach(a -> logger.info(a) );

        Files.write(Paths.get(generatedString), cutspdb);

        //List<String> cmdexe = Arrays.asList("/bin/bash", "/Users/andrea/runpdb4amb.bash" );
        //List<String> cmdexe = Arrays.asList(this.amberhome + "/bin/pdb4amber", generatedString);
        List<String> cmdexe = Arrays.asList("docker", "run", "-v",this.tmpdir+":/work", "ambertoolsconda",
                "pdb4amber", "-i" ,pdbgeneratedString, "-o", pdboutgeneratedString);
        //List<String> cmdexe = Arrays.asList("/bin/sh","-c","ls ..");
        ProcessBuilder processBuilder = new ProcessBuilder();
        Map<String, String> envb = processBuilder.environment();
        envb.put("AMBERHOME", this.amberhome);
        envb.put("PYTHONPATH", this.amberhome + "/lib/python2.7/site-packages");
        processBuilder.command(cmdexe);
        cmdexe.forEach(a -> logger.info(a));
        logger.info(String.join(" ", cmdexe));

        File dir = new File(this.tmpdir);
        if (!dir.exists()) dir.mkdirs();

        processBuilder.directory(dir);

        //processBuilder.directory(new File(System.getProperty("user.home")));

       //int exitCode = 100;
        Process process = processBuilder.start();
        Scanner sc = new Scanner(process.getErrorStream());
       while (sc.hasNext()) {
         System.out.println(sc.nextLine());
       }


        System.out.println("\nPartito ---------> : ");

        int exitCode = process.waitFor();
        System.out.println(exitCode);
        List<String> outpdb = Files.readAllLines(Paths.get(filepdboutgeneratedString));
        exitCode = process.waitFor();
        System.out.println("\nFINE ---------> : ");
        Retpdb retpdb = new Retpdb();
        retpdb.setExitcode(exitCode);
        retpdb.setPdbout(outpdb);
        retpdb.setInfoout(infoout);

        outpdb.forEach(System.out::println);
        infoout.forEach(System.out::println);
        return retpdb;

    }
}
