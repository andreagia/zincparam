package org.cirmmp.zincparam.service;

import org.apache.commons.lang3.RandomStringUtils;
import org.cirmmp.zincparam.model.Retpdb;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class Runpdb2gmx {
    Logger logger = LoggerFactory.getLogger(Runamber2pdb.class);

    @Value("${directory.tmp}")
    private String tmpdir;

    public Retpdb run(List<String> cutspdb) throws Exception {

        List<String> outpdb = new ArrayList<>();

        List<String> infoout = new ArrayList<>();

        String generatedString = this.tmpdir+ RandomStringUtils.randomAlphanumeric(10);

        Files.write(Paths.get(generatedString+".pdb"), cutspdb);

        //List<String> cmdexe = Arrays.asList("/bin/bash", "/Users/andrea/runpdb4amb.bash" );
        List<String> cmdexe = Arrays.asList("/bin/sh", "./rungmx.sh");
        //List<String> cmdexe = Arrays.asList("gmx","pdb2gmx", "-f",generatedString,"-o",generatedString+".gro","-water","none","-q",generatedString+".pdb");
        //List<String> cmdexe = Arrays.asList("/bin/sh","-c","ls ..");
        ProcessBuilder processBuilder = new ProcessBuilder();

        processBuilder.command(cmdexe);

        File dir = new File(this.tmpdir);
        if (!dir.exists()) dir.mkdirs();

        processBuilder.directory(dir);

        //processBuilder.directory(new File(System.getProperty("user.home")));
        int exitCode = 100;

            Process process = processBuilder.start();
            processBuilder.redirectErrorStream(true);
            System.out.println("\nPartito ---------> : ");
            // blocked :(
            BufferedReader readerp =
                    new BufferedReader(new InputStreamReader(process.getInputStream()));

            BufferedReader errorreader =
                    new BufferedReader(new InputStreamReader(process.getErrorStream()));

            BufferedWriter w1 = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()));
            String line = null;
            System.out.println("\nPartito 2 ---------> : ");
            System.out.println(readerp.ready());

                System.out.println("\nPartito 3 ---------> : ");
                while ((line = readerp.readLine()) != null) {
                    System.out.println("\nPartito READERP ---------> : ");
                    if (line.contains(":15")) {
                        w1.write("6");
                    }
                    System.out.println(line);
                    outpdb.add(line);
                }

                String lineerror;
                System.out.println("\nPartito ERROR ---------> : ");
                while ((lineerror = errorreader.readLine()) != null) {
                    System.out.println(lineerror);
                    infoout.add(lineerror);
                }

            errorreader.close();
            readerp.close();
            w1.close();

            exitCode = process.waitFor();
            System.out.println("\nExited with error code : " + exitCode);



        //delete temporaryfllr

        //Files.delete(Paths.get(generatedString));


        Retpdb retpdb = new Retpdb();
        retpdb.setExitcode(exitCode);
        retpdb.setPdbout(outpdb);
        retpdb.setInfoout(infoout);
        return retpdb;
    }

}
