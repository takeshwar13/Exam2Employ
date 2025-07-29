package com.exam.controller;


import com.exam.model.profile.User;
import com.exam.service.UserService; // Assuming you create a UserService for user operations
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// DTOs (Data Transfer Objects) would typically be used here
// For simplicity, we are using the User model directly.

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*") // For local development, allows requests from any origin
public class AuthController {

    @Autowired
    private UserService userService;

    // You would also inject Spring Security's AuthenticationManager here
    // private AuthenticationManager authenticationManager;
    
    // And a JWT utility class
    // private JwtUtil jwtUtil;

    /**
     * Endpoint for user registration.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // In a real app, you would hash the password before saving
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    /**
     * Endpoint for user login.
     * This is a simplified representation. A real implementation would:
     * 1. Authenticate credentials using AuthenticationManager.
     * 2. Generate a JWT token upon success.
     * 3. Return the token to the client.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        // --- Real Implementation would go here ---
        // For now, we'll just return a success message.
        // String token = generateJwtToken(user.getUsername());
        
        return ResponseEntity.ok("{\"token\": \"sample-jwt-token-for-" + user.getUsername() + "\"}");
    }
}