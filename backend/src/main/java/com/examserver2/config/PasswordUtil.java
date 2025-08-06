package com.examserver2.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordUtil {
    private static final PasswordEncoder encoder = new BCryptPasswordEncoder();

    // Encode (hash) a raw password
    /**
     * Utility class for encoding (hashing) and verifying passwords using BCrypt.
     * <p>
     * Use {@link #encode(String)} to hash a raw password before storing it in the database.
     * Use {@link #matches(String, String)} to verify a raw password against a hashed password.
     */
    public static String encode(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    // Match a raw password with an encoded password
    /**
     * Verifies a raw password against an encoded (hashed) password.
     *
     * @param rawPassword the plain text password to verify
     * @param encodedPassword the hashed password from the database
     * @return true if the raw password matches the encoded password, false otherwise
     */
    public static boolean matches(String rawPassword, String encodedPassword) {
        return encoder.matches(rawPassword, encodedPassword);
    }
}
