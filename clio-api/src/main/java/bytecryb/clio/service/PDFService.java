package bytecryb.clio.service;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
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

    public PDF get(Long id) throws ResourceNotFoundException {
        return pdfRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("File not found with id " + id));
    }

    public PDF uploadToLocal(MultipartFile file, UUID folder) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileType = file.getContentType();

        if (fileName.contains("..")) {
            throw new FileException("");
        }

        if (fileType == null) {
            throw new FileException("Could not find file type");
        }

        if (!fileType.equals("application/pdf")) {
            throw new UnsupportedFileException("File provided must be a PDF. Received Content-Type: " + fileType);
        }

        Path dest = Paths.get((System.getProperty("user.dir") + "/data/pdf/" + folder.toString()));

        if (!Files.exists(dest)) {
            Files.createDirectories(dest);
        }

        Path path = Paths.get(dest.toString() + "/" + fileName);
        PDF result = null;
        InputStream is = file.getInputStream();

        try {
            Files.copy(is, path, StandardCopyOption.REPLACE_EXISTING);
            result = this.pdfRepo.save(new PDF(fileName, path.toString()));
        } catch (Exception e) {
            is.close();
            try {
                // Try to delete if possible
                Files.delete(path);
            } catch (Exception ie) {
                // Do nothing
            }
            throw new FileException("Could Not Save File: " + fileName);
        }

        is.close();

        return result;
    }

    public Resource downloadFileFromLocal(Long id) throws ResourceNotFoundException {
        PDF result = this.pdfRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PDF not found for ID: " + id));
        Path path = Paths.get(result.getPath());
        Resource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not find file locally for ID: " + id);
        }
        return resource;
    }

    public void createDir(Path folderPath) throws Exception {
        Files.createDirectories(folderPath);
    }

}
