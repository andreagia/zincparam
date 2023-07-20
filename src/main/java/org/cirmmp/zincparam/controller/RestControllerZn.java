package org.cirmmp.zincparam.controller;


import jakarta.servlet.http.HttpServletRequest;
import org.cirmmp.zincparam.model.DownloadPDB;
import org.cirmmp.zincparam.model.ListRetFF;
import org.cirmmp.zincparam.model.RetFF;
import org.cirmmp.zincparam.model.Retpdb;
import org.cirmmp.zincparam.service.Runamber2pdb;
import org.cirmmp.zincparam.service.Runpdb2gmx;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(origins = {"https://ffmetal.cerm.unifi.it/", "http://localhost:3000"})
@RequestMapping(path = "/restzn")
public class RestControllerZn {

    Logger logger = LoggerFactory.getLogger(RestControllerZn.class);

    private Runamber2pdb runamber2pdb;

    @Autowired
    public void setRunamber2pdb(Runamber2pdb runamber2pdb){
        this.runamber2pdb = runamber2pdb;
    }
    //Runamber2pdb runamber2pdb;

    private Runpdb2gmx runpdb2gmx;
    @Autowired
    public void setRunpdb2gmx(Runpdb2gmx runpdb2gmx) {
        this.runpdb2gmx = runpdb2gmx;
    }

    @RequestMapping(value = "getFF",method = RequestMethod.GET, produces = "application/json" )
    public ResponseEntity getff() throws Exception {

       // prog = "AMB";
        List<String> listfiles = new ArrayList<>();
        //if (prog.equals( "AMB")) {
            listfiles.add("all_amino94ildn.txt");
            listfiles.add("all_aminoct94ildn.txt");
            listfiles.add("all_aminont94ildn.txt");
            listfiles.add("CYZHDZHEZ.in");
            listfiles.add("frcmod.ff99SBildn");
            listfiles.add("leaprc.ff99SBildn");
            listfiles.add("parmZn.dat");
            listfiles.add("leap.in");
        //}

        List<RetFF> vretff = new ArrayList<>();

        listfiles.forEach((filein)->{

            RetFF retff = new RetFF();
            Resource expect = new ClassPathResource("files/amber/" + filein);
            retff.setFilename(filein);
            try {
                InputStream inputStream = expect.getInputStream();
                List<String> fffile = org.apache.commons.io.IOUtils.readLines(inputStream, "UTF-8");
                //fffile.forEach(System.out::println);
               // String text = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
                //List<String> fffile = Files.readAllLines(Paths.get(expect.getFile().getAbsolutePath()));
                retff.setFilecont(fffile);
                retff.setExitcode(0);

            } catch (Exception e) {
                logger.info(e.toString());
                retff.setExitcode(1);
            }

            vretff.add(retff);

        });

        ListRetFF listretff = new ListRetFF();
        listretff.setListretff(vretff);

//        Resource expect = new ClassPathResource("files/all_amino03.in");
//
//        List<String> fffile = Files.readAllLines(Paths.get(expect.getFile().getAbsolutePath()));
//
//        logger.info(fffile.toString());
//        RetFF retff = new RetFF();
//
//        retff.setDataAmber(fffile);

        return ResponseEntity.ok(listretff);
    }


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

        Retpdb retpdb = new Retpdb();

        if (downloadPDB.getFormat().equals("Amber")){
            logger.info("RUN AMBER");
             retpdb = runamber2pdb.run(cutspdb);
             logger.info("Return pdb INI");
             retpdb.getPdbout().forEach( a -> logger.info(a));
            logger.info("Return pdb END");
        } else if (downloadPDB.getFormat().equals("Gromacs")){
            logger.info("RUN GROMACS");
            retpdb = runpdb2gmx.run(cutspdb);
        }

        logger.info("------ OUTPDB  ------- Exit Code {}",retpdb.getExitcode());
        //outpdb.forEach(a -> logger.info(a));
        //System.out.println(this.tmpdir);
        downloadPDB.setPdbout(retpdb.getPdbout());
        downloadPDB.setInfoout(retpdb.getInfoout());
        //downloadPDB.setPdbout(cutspdb);
        //downloadPDB.setPdbout(filepdblist);
       // return ResponseEntity.ok(HttpStatus.OK);
        if(retpdb.getExitcode() == 0){
            return ResponseEntity.ok(downloadPDB);
        } else {
            return ResponseEntity.status(404).body(downloadPDB);
        }
    }
}
