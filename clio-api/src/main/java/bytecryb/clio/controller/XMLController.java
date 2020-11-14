package bytecryb.clio.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bytecryb.clio.exception.ResourceNotFoundException;
import bytecryb.clio.service.XMLService;

@RestController
@RequestMapping("/api/v1")
public class XMLController {
    @Autowired
    private XMLService xmlService;

    @GetMapping("/xml/{id}")
    public ResponseEntity<Resource> getXML(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        Resource resource = xmlService.downloadFileFromLocal(id);
        String type;

        try {
            type = Files.probeContentType(Paths.get(resource.getFile().getAbsolutePath()));
        } catch (IOException e) {
            type = "text/xml";
        }

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(type))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
