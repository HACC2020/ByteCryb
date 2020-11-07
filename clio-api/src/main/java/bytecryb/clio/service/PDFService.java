package bytecryb.clio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import bytecryb.clio.exception.FileException;
import bytecryb.clio.exception.ResourceNotFoundException;
import bytecryb.clio.exception.UnsupportedFileException;
import bytecryb.clio.model.PDF;
import bytecryb.clio.repository.PDFRepository;

@Service
public class PDFService {

    @Autowired
    private PDFRepository pdfRepo;

    public PDF save(MultipartFile input) throws FileException, UnsupportedFileException {

        String fileName = StringUtils.cleanPath(input.getOriginalFilename());

        String fileType = input.getContentType();

        PDF pdf;

        if (fileName.contains("..")) {
            throw new FileException("");
        }

        if (fileType == null) {
            throw new FileException("Could not find file type");
        }

        if (!fileType.equals("application/pdf")) {
            throw new UnsupportedFileException("File provided must be a PDF. Received Content Type: " + fileType);
        }

        try {
            pdf = new PDF(fileName, input.getBytes());

            pdfRepo.save(pdf);
        } catch (Exception e) {
            throw new FileException("Could not store " + fileName);
        }

        return pdf;
    }

    public PDF get(Long id) throws ResourceNotFoundException {
        return pdfRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("File not found with id " + id));
    }

}
