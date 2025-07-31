package com.exam.service;


import com.exam.model.profile.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    /**
     * Creates a new user for standard registration.
     * @param user The user object with plaintext password.
     * @return The saved user.
     */
    User createUser(User user);

    /**
     * Finds a user by their username (email).
     * @param username The username to search for.
     * @return The User object or null if not found.
     */
    User findByUsername(String username);
}