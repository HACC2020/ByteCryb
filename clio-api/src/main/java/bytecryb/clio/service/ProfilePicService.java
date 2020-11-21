package bytecryb.clio.service;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import bytecryb.clio.exception.FileException;
import bytecryb.clio.exception.ResourceNotFoundException;
import bytecryb.clio.exception.UnsupportedFileException;
import bytecryb.clio.model.ProfilePic;
import bytecryb.clio.repository.ProfilePicRepository;

@Service
public class ProfilePicService {

    @Autowired
    private ProfilePicRepository picRepo;

    public ProfilePic uploadProfilePic(MultipartFile file) throws Exception {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileType = file.getContentType();

        if (!fileType.equals("image/jpeg") && !fileType.equals("image/pjpeg") && !fileType.equals("image/png")) {
            throw new UnsupportedFileException(
                    "Only variants of .jpg plus .png are supported. Received Content-Type: " + fileType);
        }

        Path dest = Paths.get((System.getProperty("user.dir") + "/data/profile_pic/"));

        if (!Files.exists(dest)) {
            Files.createDirectories(dest);
        }

        Path path = Paths.get(dest.toString() + "/" + fileName);
        ProfilePic result = null;
        InputStream is = file.getInputStream();

        int serialNum = 0;

        // Keep looking for the next avaliable filename with num
        while (path.toFile().exists()) {
            serialNum++;
            System.out.println(fileName);
            String[] splitFileName = fileName.split("\\.");
            for (String part : splitFileName) {
                System.out.println("hello");
                System.out.println(part.toString());
            }
            if (splitFileName.length == 2) {
                path = Paths.get(dest.toString() + "/" + splitFileName[0] + "(" + serialNum + ")." + splitFileName[1]);
            } else {
                throw new Exception("Filenames must only contain one \".\" followed by file extension!");
            }
        }

        // Must increment to avoid overriding
        try {
            Files.copy(is, path, StandardCopyOption.REPLACE_EXISTING);
            result = this.picRepo.save(new ProfilePic(path.toString()));
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

    public void removeProfilePic(Long id) throws ResourceNotFoundException {
        ProfilePic picMeta = this.picRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("You currently do not have a profile picture!"));

        if (picMeta.getPath().equals("")) {
            throw new ResourceNotFoundException("You currently do not have a profile picture!");
        }

        File pic = Paths.get(picMeta.getPath()).toFile();

        if (!pic.exists()) {
            throw new ResourceNotFoundException("You currently do not have a profile picture!");
        }

        pic.delete();

        picMeta.setPath("");

        this.picRepo.save(picMeta);
    }

    public Resource getProfilePicById(Long id) throws ResourceNotFoundException {
        ProfilePic result = this.picRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PDF not found for ID: " + id));
        Path path = Paths.get(result.getPath());
        Resource resource = null;
        if (result.getPath().equals("")) {
            throw new ResourceNotFoundException("You currently do not have a profile picture!");
        }
        try {
            resource = new UrlResource(path.toUri());
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not find profile picture. Upload a new picture!");
        }
        return resource;
    }

}
