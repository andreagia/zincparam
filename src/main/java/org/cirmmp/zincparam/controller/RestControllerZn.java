package org.cirmmp.zincparam.controller;


import org.apache.commons.lang3.RandomStringUtils;
import org.cirmmp.zincparam.model.DownloadPDB;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.function.Consumer;
import java.util.regex.Pattern;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/restzn")
public class RestControllerZn {

    Logger logger = LoggerFactory.getLogger(RestControllerZn.class);

    @Value("${directory.tmp}")
    private String tmpdir;

    @Value("${directory.amberhome}")
    private String amberhome;

    @RequestMapping(value = "sendpdb", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity runShell(@RequestBody DownloadPDB downloadPDB, HttpServletRequest request) throws Exception {
        List<String> filepdblist = downloadPDB.getFilepdb();
        //filepdblist.forEach(a -> logger.info(a));
        Pattern pattern = Pattern.compile("^(ATOM|END|TER|HETATM)+([\\s A-Z a-z 0-9 . -])*");
       //sanitaze amber pdb input
        List<String> spdb = filepdblist
                .stream()
                .map(x -> new Scanner(x).findAll(pattern)
                        .map(m -> m.group())
                        .collect(Collectors.toList())
                )
                .flatMap(List::stream)
                .collect(Collectors.toList());
        // cut pdb to 54 column
        List<String> cutspdb = spdb.stream()
                .map(s -> s.startsWith("ATOM") ? s.substring(0, 54) : s)
                .collect(Collectors.toList());
        logger.info("PDB Sanitazied");
        //spdb.forEach(a -> logger.info(a));
        //cutspdb.forEach(a -> logger.info(a));
        logger.info("PIPPO");
        //logger.info(filepdblist[0]);
        //logger.info(filepdblist[1]);


        List<String> outpdb = new ArrayList<>();
        List<String> infoout = new ArrayList<>();

        String generatedString = this.tmpdir+RandomStringUtils.randomAlphanumeric(10)+".pdb";
        Files.write(Paths.get(generatedString), cutspdb);
        //List<String> cmdexe = Arrays.asList("/bin/bash", "/Users/andrea/runpdb4amb.bash" );
        List<String> cmdexe = Arrays.asList(this.amberhome+"/bin/pdb4amber", generatedString);
        //List<String> cmdexe = Arrays.asList("/bin/sh","-c","ls ..");
        ProcessBuilder processBuilder = new ProcessBuilder();
        Map<String, String> envb = processBuilder.environment();
        envb.put("AMBERHOME", this.amberhome);
        envb.put("PYTHONPATH", this.amberhome+"/lib/python2.7/site-packages");
        processBuilder.command(cmdexe);


        processBuilder.directory(new File(this.tmpdir));

        //processBuilder.directory(new File(System.getProperty("user.home")));

        int exitCode = 100;
        try {

            Process process = processBuilder.start();

            System.out.println("\nPartito ---------> : ");
            // blocked :(
            BufferedReader reader =
                    new BufferedReader(new InputStreamReader(process.getInputStream()));

            BufferedReader errorreader =
                    new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String line;
            System.out.println("\nPartito 2 ---------> : ");
            while ((line = reader.readLine()) != null) {
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
            reader.close();

             exitCode = process.waitFor();
            System.out.println("\nExited with error code : " + exitCode);

        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //delete temporaryfllr
        Files.delete(Paths.get(generatedString));

        logger.info("------ OUTPDB  -------");
        //outpdb.forEach(a -> logger.info(a));
        System.out.println(this.tmpdir);
        downloadPDB.setPdbout(outpdb);
        downloadPDB.setInfoout(infoout);
        //downloadPDB.setPdbout(cutspdb);
        //downloadPDB.setPdbout(filepdblist);
       // return ResponseEntity.ok(HttpStatus.OK);
        if(exitCode == 0){
            return ResponseEntity.ok(downloadPDB);
        } else {
            return ResponseEntity.status(404).body(downloadPDB);
        }
    }
}
