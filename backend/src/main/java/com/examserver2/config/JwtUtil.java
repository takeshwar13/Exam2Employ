package com.examserver2.config;

import java.util.Date;
import java.security.Key;  // ✅ NEW: For secure key
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;  // ✅ NEW: To generate Key securely

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


/**
 * Utility class for generating, validating, and parsing JWT tokens.
 * <p>
 * - Uses a secure secret key for signing tokens
 * - Generates tokens with 1-day expiration
 * - Extracts username from token
 * - Validates token signature and expiration
 */
@Component
public class JwtUtil {

    // ❌ OLD (deprecated): secret string
    // private String secret = "mysecretkey";

    // ✅ NEW: Use a strong secret (min 32 chars) and convert to Key
    private String secret = "mysecretkeymysecretkeymysecretkey";  // 32+ chars
    private Key key = Keys.hmacShaKeyFor(secret.getBytes());  // ✅ Secure Key object


    /**
     * Generates a JWT token for the given username.
     * @param username the username to include in the token
     * @return signed JWT token (valid for 1 day)
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiry
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }


    /**
     * Extracts the username (subject) from a JWT token.
     * @param token JWT token
     * @return username (subject)
     */
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    /**
     * Validates a JWT token:
     * <ul>
     *   <li>Checks if the username matches the user details</li>
     *   <li>Checks if the token is not expired</li>
     * </ul>
     * @param token JWT token
     * @param userDetails UserDetails to match
     * @return true if valid, false otherwise
     */
    public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /**
     * Checks if a JWT token is expired.
     * @param token JWT token
     * @return true if expired, false otherwise
     */
    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}
