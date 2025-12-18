package com.loomi.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {
    private static final Logger logger = LoggerFactory.getLogger(FileStorageService.class);
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    private static final List<String> ALLOWED_EXTENSIONS = List.of("jpg", "jpeg", "png", "gif", "webp");

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    private boolean isValidImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return false;
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            return false;
        }

        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            logger.warn("Invalid file extension: {}", extension);
            return false;
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            logger.warn("File size too large: {} bytes", file.getSize());
            return false;
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            logger.warn("Invalid content type: {}", contentType);
            return false;
        }

        return true;
    }

    public List<String> saveFiles(MultipartFile[] files) {
        List<String> fileUrls = new ArrayList<>();
        
        if (files == null || files.length == 0) {
            return fileUrls;
        }

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            for (MultipartFile file : files) {
                if (!isValidImageFile(file)) {
                    logger.warn("Skipping invalid file: {}", file.getOriginalFilename());
                    continue;
                }

                try {
                    String originalFilename = file.getOriginalFilename();
                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    String fileName = UUID.randomUUID().toString() + extension;
                    Path filePath = uploadPath.resolve(fileName);
                    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                    
                    String fileUrl = "/uploads/" + fileName;
                    fileUrls.add(fileUrl);
                    logger.info("File saved: {}", fileUrl);
                } catch (IOException e) {
                    logger.error("Error saving file: {}", file.getOriginalFilename(), e);

                }
            }
        } catch (IOException e) {
            logger.error("Error creating upload directory", e);
            throw new com.loomi.exception.FileStorageException("Failed to save files", e);
        }

        return fileUrls;
    }

    public void deleteFile(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return;
        }

        try {
            String fileName = fileUrl.replace("/uploads/", "");
            Path filePath = Paths.get(uploadDir).resolve(fileName);
            Files.deleteIfExists(filePath);
            logger.info("File deleted: {}", fileUrl);
        } catch (IOException e) {
            logger.error("Error deleting file: {}", fileUrl, e);
        }
    }
}


