package com.loomi.controller;

import com.loomi.dto.ProfileDto;
import com.loomi.exception.ResourceNotFoundException;
import com.loomi.model.Profile;
import com.loomi.model.User;
import com.loomi.service.FileStorageService;
import com.loomi.service.ProfileService;
import com.loomi.util.ProfileMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);

    private final ProfileService profileService;
    private final FileStorageService fileStorageService;

    public ProfileController(ProfileService profileService, FileStorageService fileStorageService) {
        this.profileService = profileService;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileDto> getMyProfile(@AuthenticationPrincipal User user) {
        logger.debug("Getting profile for user: {}", user != null ? user.getId() : "null");
        Profile profile = profileService.getByUser(user);
        if (profile == null) {
            throw new ResourceNotFoundException("Profile not found");
        }
        return ResponseEntity.ok(ProfileMapper.toDto(profile));
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<ProfileDto> createOrUpdateProfile(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "age", required = false) String age,
            @RequestParam(value = "bio", required = false) String bio,
            @RequestParam(value = "telegram", required = false) String telegram,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "education", required = false) String education,
            @RequestParam(value = "relationships", required = false) String relationships,
            @RequestParam(value = "purposeRelationships", required = false) String purposeRelationships,
            @RequestParam(value = "interests", required = false) List<String> interests,
            @RequestParam(value = "genderInterests", required = false) List<String> genderInterests,
            @RequestParam(value = "photos", required = false) MultipartFile[] photos,
            @RequestParam(value = "existingPhotos", required = false) List<String> existingPhotos,
            @AuthenticationPrincipal User user) {
        
        if (user == null) {
            logger.warn("Attempt to create/update profile without authentication");
            throw new ResourceNotFoundException("User not authenticated");
        }
        
        logger.info("Creating/updating profile for user: {}", user.getId());


        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }

        ProfileDto dto = new ProfileDto();
        dto.setName(name.trim());
        
        if (age != null && !age.trim().isEmpty()) {
            try {
                int ageValue = Integer.parseInt(age.trim());
                if (ageValue < 18 || ageValue > 120) {
                    throw new IllegalArgumentException("Age must be between 18 and 120");
                }
                dto.setAge(ageValue);
            } catch (NumberFormatException e) {
                logger.warn("Invalid age format: {}", age);
                throw new IllegalArgumentException("Invalid age format");
            }
        }
        

        dto.setEmail(user.getEmail());
        
        dto.setBio(bio != null ? bio.trim() : null);
        dto.setTelegram(telegram != null ? telegram.trim() : null);
        dto.setLocation(location != null ? location.trim() : null);
        dto.setEducation(education != null ? education.trim() : null);
        dto.setRelationships(relationships != null ? relationships.trim() : 
                            (purposeRelationships != null ? purposeRelationships.trim() : null));
        
        if (interests != null && !interests.isEmpty()) {
            dto.setInterests(interests.stream()
                    .filter(i -> i != null && !i.trim().isEmpty())
                    .map(String::trim)
                    .distinct()
                    .collect(java.util.stream.Collectors.toList()));
        }
        if (genderInterests != null && !genderInterests.isEmpty()) {
            dto.setGenderInterests(genderInterests.stream()
                    .filter(g -> g != null && !g.trim().isEmpty())
                    .map(String::trim)
                    .distinct()
                    .collect(java.util.stream.Collectors.toList()));
        }


        Profile existingProfile = profileService.getByUser(user);
        List<String> allPhotoUrls = new ArrayList<>();

        if (existingProfile != null && existingProfile.getPhotos() != null && !existingProfile.getPhotos().isEmpty()) {
            allPhotoUrls.addAll(existingProfile.getPhotos());
        }
        

        if (existingPhotos != null && !existingPhotos.isEmpty()) {
            allPhotoUrls.clear();
            allPhotoUrls.addAll(existingPhotos.stream()
                    .filter(url -> url != null && !url.trim().isEmpty())
                    .collect(java.util.stream.Collectors.toList()));
        }
        

        if (photos != null && photos.length > 0) {
            List<String> newPhotoUrls = fileStorageService.saveFiles(photos);
            allPhotoUrls.addAll(newPhotoUrls);
            if (newPhotoUrls.isEmpty() && photos.length > 0) {
                logger.warn("No valid photos were saved from {} uploaded files", photos.length);
            }
        }
        
        if (existingProfile != null) {
            dto.setId(existingProfile.getId());
        }
        
        dto.setPhotos(allPhotoUrls);

        Profile profile = ProfileMapper.toEntity(dto);
        profile.setUser(user);
        Profile saved = profileService.saveOrUpdate(profile);
        return ResponseEntity.status(HttpStatus.CREATED).body(ProfileMapper.toDto(saved));
    }

    @PutMapping
    public ResponseEntity<ProfileDto> updateProfile(
            @RequestBody ProfileDto dto,
            @AuthenticationPrincipal User user) {
        logger.info("Updating profile for user: {}", user.getId());
        
        Profile existingProfile = profileService.getByUser(user);
        if (existingProfile == null) {
            throw new ResourceNotFoundException("Profile not found");
        }

        dto.setId(existingProfile.getId());

        if (dto.getPhotos() == null || dto.getPhotos().isEmpty()) {
            dto.setPhotos(existingProfile.getPhotos());
        }

        Profile profile = ProfileMapper.toEntity(dto);
        profile.setUser(user);
        Profile saved = profileService.saveOrUpdate(profile);
        return ResponseEntity.ok(ProfileMapper.toDto(saved));
    }
}





