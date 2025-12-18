package com.loomi.controller;

import com.loomi.dto.ProfileDto;
import com.loomi.exception.ResourceNotFoundException;
import com.loomi.model.Profile;
import com.loomi.model.User;
import com.loomi.service.ProfileService;
import com.loomi.util.ProfileMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {
    private static final Logger logger = LoggerFactory.getLogger(RecommendationController.class);

    private final ProfileService profileService;

    public RecommendationController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<List<ProfileDto>> getRecommendations(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "10") int limit) {
        
        if (user == null) {
            logger.warn("Attempt to get recommendations without authentication");
            throw new ResourceNotFoundException("User not authenticated");
        }
        

        if (limit < 1 || limit > 50) {
            limit = 10;
            logger.warn("Invalid limit value, using default: 10");
        }
        
        logger.debug("Getting recommendations for user: {} with limit: {}", user.getId(), limit);

        Profile myProfile = profileService.getByUser(user);
        if (myProfile == null) {
            throw new ResourceNotFoundException("Profile not found. Please create your profile first.");
        }

        List<Profile> recommendations = profileService.getRecommendationsFor(myProfile, limit);
        List<ProfileDto> dtos = recommendations.stream()
                .map(ProfileMapper::toDto)
                .collect(Collectors.toList());

        logger.info("Returning {} recommendations for user: {}", dtos.size(), user.getId());
        return ResponseEntity.ok(dtos);
    }
}





