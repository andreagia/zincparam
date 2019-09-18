package org.cirmmp.zincparam.controller;

import org.cirmmp.zincparam.model.DownloadPDB;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/restzn")
public class RestControllerZn {

    Logger logger = LoggerFactory.getLogger(RestControllerZn.class);

    @RequestMapping(value = "sendpdb", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity runShell(@RequestBody DownloadPDB downloadPDB, HttpServletRequest request) throws Exception {
        List<String> filepdblist = downloadPDB.getFilepdb();
       filepdblist.forEach(a -> logger.info(a));
        logger.info("PIPPO");
        //logger.info(filepdblist[0]);
        //logger.info(filepdblist[1]);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
