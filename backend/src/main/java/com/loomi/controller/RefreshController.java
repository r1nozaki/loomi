package com.loomi.controller;

import com.loomi.dto.AuthResponse;
import com.loomi.model.User;
import com.loomi.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RefreshController {
    private static final Logger logger = LoggerFactory.getLogger(RefreshController.class);

    private final AuthService authService;

    public RefreshController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@AuthenticationPrincipal User user) {
        if (user == null) {
            logger.warn("Refresh request without authentication");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        logger.info("Refresh token request for user: {}", user.getEmail());
        AuthResponse response = authService.refresh(user);
        return ResponseEntity.ok(response);
    }
}


