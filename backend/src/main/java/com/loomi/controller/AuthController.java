package com.loomi.controller;

import com.loomi.dto.AuthRequest;
import com.loomi.dto.AuthResponse;
import com.loomi.dto.GoogleAuthRequest;
import com.loomi.dto.RegisterRequest;
import com.loomi.model.User;
import com.loomi.service.AuthService;
import com.loomi.service.GoogleAuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final GoogleAuthService googleAuthService;

    public AuthController(AuthService authService, GoogleAuthService googleAuthService) {
        this.authService = authService;
        this.googleAuthService = googleAuthService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        logger.info("Registration request for email: {}", request.getEmail());
        AuthResponse response = authService.register(request.getEmail(), request.getPassword());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        logger.info("Login request for email: {}", request.getEmail());
        AuthResponse response = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(response);
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

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        logger.info("Logout request");

        return ResponseEntity.ok().build();
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleAuth(@Valid @RequestBody GoogleAuthRequest request) {
        logger.info("Google authentication request");
        AuthResponse response = googleAuthService.authenticateWithGoogle(request.getIdToken());
        return ResponseEntity.ok(response);
    }
}





