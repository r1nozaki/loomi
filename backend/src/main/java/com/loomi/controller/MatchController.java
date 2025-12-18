package com.loomi.controller;

import com.loomi.dto.ProfileDto;
import com.loomi.model.User;
import com.loomi.service.MatchService;
import com.loomi.util.ProfileMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/matches")
public class MatchController {
    private static final Logger logger = LoggerFactory.getLogger(MatchController.class);

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping
    public ResponseEntity<List<ProfileDto>> getMatches(@AuthenticationPrincipal User user) {
        if (user == null) {
            logger.warn("Attempt to get matches without authentication");
            throw new com.loomi.exception.ResourceNotFoundException("User not authenticated");
        }
        
        logger.debug("Getting matches for user: {}", user.getId());
        List<com.loomi.model.Profile> matches = matchService.getMatchesFor(user);
        List<ProfileDto> dtos = matches.stream()
                .map(ProfileMapper::toDto)
                .collect(Collectors.toList());
        
        logger.info("Returning {} matches for user: {}", dtos.size(), user.getId());
        return ResponseEntity.ok(dtos);
    }
}





