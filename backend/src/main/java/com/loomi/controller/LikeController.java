package com.loomi.controller;

import com.loomi.dto.LikeDto;
import com.loomi.model.User;
import com.loomi.service.LikeService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
    private static final Logger logger = LoggerFactory.getLogger(LikeController.class);

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping
    public ResponseEntity<LikeDto> likeProfile(
            @Valid @RequestBody LikeDto request,
            @AuthenticationPrincipal User user) {
        if (user == null) {
            logger.warn("Attempt to like profile without authentication");
            throw new com.loomi.exception.ResourceNotFoundException("User not authenticated");
        }
        
        if (request.getToProfileId() == null) {
            throw new IllegalArgumentException("Profile ID is required");
        }
        
        logger.info("Like request from user {} to profile {}", user.getId(), request.getToProfileId());
        LikeDto response = likeService.like(user, request.getToProfileId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}





