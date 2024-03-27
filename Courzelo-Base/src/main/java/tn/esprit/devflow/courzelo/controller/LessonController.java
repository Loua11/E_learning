package tn.esprit.devflow.courzelo.controller;

import groovy.util.logging.Slf4j;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.env.Environment;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.devflow.courzelo.entity.Lesson;
import tn.esprit.devflow.courzelo.services.ILessonService;
import tn.esprit.devflow.courzelo.services.LessonService;


import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LessonController {
    private static final Logger logger = LoggerFactory.getLogger(LessonController.class);
    private static final Logger log = LoggerFactory.getLogger(LessonController.class);
    @Autowired
    private Environment env;
    @Autowired
    ILessonService lessonService;
    @Autowired
    LessonService lessonServ;

    @PostMapping("/addLesson")
    public Lesson addLesson(@RequestBody Lesson l) {
        return lessonService.addLesson(l);
    }

    @GetMapping("/retrieveallLesson")
    @ResponseBody
    public List<Lesson> getLesson() {

        List<Lesson> listLesson = lessonService.retrieveAllLesson();

        return listLesson ;

    }
    @PutMapping("/updateLesson/{idlesson}")

    @ResponseBody
    public Lesson modifyLesson(@RequestBody Lesson l) {

        return lessonService.updateLesson(l);

    }
    @DeleteMapping("/DeleteLesson/{idlesson}")

    @ResponseBody

    public void deleteLesson(@PathVariable String idlesson) {

        lessonService.deleteLesson(idlesson);

    }

    @GetMapping("/retrieveLesson/{Lessonid}")
    @ResponseBody

    public Lesson retrieveLesson (@PathVariable ("Lessonid")String idlesson) {
        return lessonService.retrieveLesson(idlesson);
    }

    @PostMapping(value = "/uploadFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Lesson> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("title") String title) {
        Lesson uploadedLesson = lessonServ.uploadFile(file, title);

        if (uploadedLesson != null) {
            return ResponseEntity.ok(uploadedLesson);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Displays the list of uploaded files.
    @GetMapping("/getFiles")
    public List<String> getFiles() throws IOException {
        return lessonServ.getFiles();
    }
    // Displays the list of uploaded files.
//    @GetMapping("/getFilesWithInfo")
//    public List<Lesson> getFilesWithInfo() throws IOException {
//        return lessonServ.getFilesWithInfo();
//    }


    @GetMapping("/downloadFile/{content}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String content, HttpServletRequest request) throws MalformedURLException {
        Resource resource = lessonServ.loadFileAsResource(content);
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }
        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; content=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

//    @GetMapping("/content/{content}")
//    public ResponseEntity<String> getFileContent(@PathVariable String content) {
//        String fileContent = lessonServ.getFileContent(content);
//
//        if (fileContent != null) {
//            return ResponseEntity.ok().body(fileContent);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }


    @GetMapping("/content/{content}")
    public ResponseEntity<byte[]> getFileContent(@PathVariable String content) {
        try {
            Path filePath = Paths.get(env.getProperty("file.upload-dir")).resolve(content);
            byte[] fileContent = Files.readAllBytes(filePath);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("inline", content);

            return new ResponseEntity<>(fileContent, headers, HttpStatus.OK);
        } catch (IOException e) {
            log.error("Error reading file content for {}.", content, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
