package com.examserver2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examserver2.entities.User;
import com.examserver2.service.user.UserService;
import com.examserver2.config.JwtUtil;

@RestController
@RequestMapping("api/auth")

/**
 * Controller for user authentication (signup, login).
 * <p>
 * - /sign-up: Registers a new user
 * - /login: Authenticates user and returns JWT token
 */
public class UserController {


    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        if (userService.hasUserWithEmail(user.getEmail())) {
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        User createdUser = userService.createUser(user);
        if (createdUser == null) {
            return new ResponseEntity<>("User not created, come again later", HttpStatus.NOT_ACCEPTABLE);
        }

        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }
    
    /**
     * Authenticates a user and returns a JWT token if successful.
     *
     * @param user User credentials (email, password)
     * @return JWT token and user info if successful, error otherwise
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
    User dbUser = userService.login(user);
    if (dbUser == null) {
        return ResponseEntity
            .status(HttpStatus.NOT_ACCEPTABLE)
            .body("Invalid email or password");
    }
    // Generate JWT token using email as subject and role as claim
    String token = jwtUtil.generateToken(dbUser.getEmail(), dbUser.getRole().name());
    // Return token and user info
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(new LoginResponse(token, dbUser));
    }

    /**
     * DTO for login response containing JWT token and user info.
     */
    public static class LoginResponse {
        public String token;
        public User user;
        public LoginResponse(String token, User user) {
            this.token = token;
            this.user = user;
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
