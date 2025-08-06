package com.examserver2.config;

import java.util.Date;
import java.security.Key;  // ✅ NEW: For secure key
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;  // ✅ NEW: To generate Key securely

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    // ❌ OLD (deprecated): secret string
    // private String secret = "mysecretkey";

    // ✅ NEW: Use a strong secret (min 32 chars) and convert to Key
    private String secret = "mysecretkeymysecretkeymysecretkey";  // 32+ chars
    private Key key = Keys.hmacShaKeyFor(secret.getBytes());  // ✅ Secure Key object

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiry
                .signWith(key, SignatureAlgorithm.HS256)  // ✅ FIXED: No deprecated method
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()             // ✅ FIXED: parserBuilder() instead of parser()
                .setSigningKey(key)             // ✅ FIXED: use Key, not raw String
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()   // ✅ FIXED: parserBuilder()
                .setSigningKey(key)              // ✅ FIXED: Key instead of secret
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}
