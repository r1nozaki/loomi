package com.loomi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.loomi.config.JwtUtil;
import com.loomi.dto.AuthResponse;
import com.loomi.dto.UserDto;
import com.loomi.exception.BadCredentialsException;
import com.loomi.model.User;
import com.loomi.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class GoogleAuthService {
    private static final Logger logger = LoggerFactory.getLogger(GoogleAuthService.class);
    private static final String GOOGLE_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=";

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GoogleAuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    private UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getEmail());
    }

    @Transactional
    public AuthResponse authenticateWithGoogle(String idToken) {
        logger.info("Attempting to authenticate with Google");

        try {
            String url = GOOGLE_TOKEN_INFO_URL + idToken;
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                logger.warn("Failed to validate Google ID token");
                throw new BadCredentialsException("Invalid Google token");
            }


            JsonNode tokenInfo = objectMapper.readTree(response.getBody());
            

            if (tokenInfo.has("error")) {
                logger.warn("Google token validation error: {}", tokenInfo.get("error").asText());
                throw new BadCredentialsException("Invalid Google token");
            }
            
            if (!tokenInfo.has("email") || tokenInfo.get("email").isNull()) {
                logger.warn("Google token does not contain email");
                throw new BadCredentialsException("Google token does not contain email");
            }
            
            String email = tokenInfo.get("email").asText();
            String name = tokenInfo.has("name") && !tokenInfo.get("name").isNull() ? tokenInfo.get("name").asText() : null;
            String picture = tokenInfo.has("picture") && !tokenInfo.get("picture").isNull() ? tokenInfo.get("picture").asText() : null;

            if (email == null || email.isEmpty()) {
                logger.warn("Google token email is empty");
                throw new BadCredentialsException("Google token does not contain email");
            }

            logger.info("Google token validated for email: {}", email);


            Optional<User> existingUser = userRepository.findByEmail(email);
            User user;

            if (existingUser.isPresent()) {
                user = existingUser.get();
                logger.info("User found: {}", email);
            } else {
                user = User.builder()
                        .email(email)
                        .password(null)
                        .build();
                user = userRepository.save(user);
                logger.info("New user created from Google: {}", email);
            }


            String token = jwtUtil.generateToken(email);
            return new AuthResponse(token, toUserDto(user));

        } catch (Exception e) {
            logger.error("Error authenticating with Google: {}", e.getMessage(), e);
            throw new BadCredentialsException("Failed to authenticate with Google: " + e.getMessage());
        }
    }
}

