package com.loomi.service;

import com.loomi.config.JwtUtil;
import com.loomi.dto.AuthResponse;
import com.loomi.dto.UserDto;
import com.loomi.exception.BadCredentialsException;
import com.loomi.exception.ResourceAlreadyExistsException;
import com.loomi.model.User;
import com.loomi.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    private UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getEmail());
    }

    @Transactional
    public AuthResponse register(String email, String rawPassword) {
        logger.info("Attempting to register user with email: {}", email);

        if (userRepository.findByEmail(email).isPresent()) {
            logger.warn("Registration failed: email already exists - {}", email);
            throw new ResourceAlreadyExistsException("Email already exists");
        }

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(rawPassword))
                .build();

        user = userRepository.save(user);
        logger.info("User registered successfully: {}", email);

        String token = jwtUtil.generateToken(email);
        return new AuthResponse(token, toUserDto(user));
    }

    public AuthResponse login(String email, String rawPassword) {
        logger.info("Attempting to login user: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.warn("Login failed: user not found - {}", email);
                    return new BadCredentialsException("Invalid email or password");
                });

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            logger.warn("Login failed: user registered with Google - {}", email);
            throw new BadCredentialsException("This account was registered with Google. Please use Google Sign-In.");
        }

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            logger.warn("Login failed: invalid password for user - {}", email);
            throw new BadCredentialsException("Invalid email or password");
        }

        logger.info("User logged in successfully: {}", email);
        String token = jwtUtil.generateToken(email);
        return new AuthResponse(token, toUserDto(user));
    }

    public AuthResponse refresh(User user) {
        logger.info("Refreshing token for user: {}", user.getEmail());
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, toUserDto(user));
    }
}





