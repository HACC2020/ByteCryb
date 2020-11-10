package bytecryb.clio.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bytecryb.clio.exception.ResourceNotFoundException;
import bytecryb.clio.model.PDF;
import bytecryb.clio.service.PDFService;

@RestController
@RequestMapping("/api/v1")
public class PDFController {
    @Autowired
    private PDFService pdfService;

    @GetMapping("/pdf/{id}")
    public ResponseEntity<Resource> getPDF(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Resource resource = pdfService.downloadFileFromLocal(id);
        String type;

        try {
            type = Files.probeContentType(Paths.get(resource.getFile().getAbsolutePath()));
        } catch (IOException e) {
            type = "application/pdf";
        }

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(type))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PostMapping("/pdf/upload")
    public ResponseEntity<PDF> upload(@RequestParam("file") MultipartFile file) throws Exception {
        UUID folder = UUID.randomUUID();
        PDF result = this.pdfService.uploadToLocal(file, folder);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/pdf/multi-upload")
    public ResponseEntity<List<PDF>> multiUpload(@RequestParam("files") MultipartFile[] files) throws Exception {
        UUID folder = UUID.randomUUID();
        List<PDF> fileDownloadUrls = new ArrayList<>();

        for (MultipartFile file : files) {
            fileDownloadUrls.add(this.pdfService.uploadToLocal(file, folder));
        }

        // Arrays.asList(files).stream().forEach(file -> {
        // try {
        // fileDownloadUrls.add(this.pdfService.uploadToLocal(file, folder));
        // } catch (Exception e) {
        // }
        // });

        return ResponseEntity.ok(fileDownloadUrls);
    }

}
