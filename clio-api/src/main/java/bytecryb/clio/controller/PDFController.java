package bytecryb.clio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
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

import bytecryb.clio.exception.FileException;
import bytecryb.clio.exception.ResourceNotFoundException;
import bytecryb.clio.exception.UnsupportedFileException;
import bytecryb.clio.model.PDF;
import bytecryb.clio.service.PDFService;

@RestController
@RequestMapping("/api/v1")
public class PDFController {

    @Autowired
    private PDFService pdfService;

    @GetMapping("/pdf/{id}")
    public ResponseEntity<Resource> getPDF(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        PDF result = pdfService.get(id);

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + result.getName() + "\"")
                .body(new ByteArrayResource(result.getData()));
    }

    @PostMapping("/pdf")
    public ResponseEntity<String> uploadPDF(@RequestParam("file") MultipartFile input)
            throws FileException, UnsupportedFileException {

        PDF result = pdfService.save(input);

        return ResponseEntity.ok().body(new String("Succesfully Created Job: " + result.getId()));
    }

}
