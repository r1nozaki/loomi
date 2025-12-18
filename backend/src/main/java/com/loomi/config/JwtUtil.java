package com.loomi.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${app.jwt.secret}")
    private String secretString;

    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    private SecretKey getSigningKey() {
        byte[] keyBytes = secretString.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + expirationMs);

        String token = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(getSigningKey())
                .compact();

        logger.debug("Generated JWT token for user: {}", email);
        return token;
    }

    public String extractEmail(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(getSigningKey())
                    .parseClaimsJws(token)
                    .getBody();
            String email = claims.getSubject();
            logger.debug("Successfully extracted email from token: {}", email);
            return email;
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            logger.warn("Token expired: {}", e.getMessage());
            return null;
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            logger.warn("Malformed token: {}", e.getMessage());
            return null;
        } catch (io.jsonwebtoken.SignatureException e) {
            logger.warn("Invalid token signature: {}", e.getMessage());
            return null;
        } catch (Exception e) {
            logger.warn("Failed to extract email from token: {} - {}", e.getClass().getSimpleName(), e.getMessage());
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(getSigningKey())
                    .parseClaimsJws(token);
            logger.debug("Token validation successful");
            return true;
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            logger.warn("Token expired: {}", e.getMessage());
            return false;
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            logger.warn("Malformed token: {}", e.getMessage());
            return false;
        } catch (io.jsonwebtoken.SignatureException e) {
            logger.warn("Invalid token signature: {}", e.getMessage());
            return false;
        } catch (Exception e) {
            logger.warn("Token validation failed: {} - {}", e.getClass().getSimpleName(), e.getMessage());
            return false;
        }
    }
}

