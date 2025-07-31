package com.exam.service.impl;


import com.exam.model.auth.AuthProvider;

import com.exam.model.profile.AdminProfile;
import com.exam.model.profile.CandidateProfile;
import com.exam.model.profile.RecruiterProfile;
import com.exam.model.profile.User;
import com.exam.repo.user.UserRepository;
import com.exam.security.CustomUserDetails;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Ensure this is configured as a @Bean

    /**
     * This method is called by Spring Security during standard form-based login.
     */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return CustomUserDetails.create(user);
    }

    @Override
    @Transactional
    public User createUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        // Encrypt password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setAuthProvider(AuthProvider.LOCAL);
        
        // For new registrations, you might want admin approval
        user.setApproved(false); // Set to true if they are approved by default

        // Create the corresponding profile based on the role
        createProfileForUser(user);

        return userRepository.save(user);
    }
    
    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * A helper method to create and associate role-specific profiles upon user creation.
     * @param user The user for whom to create a profile.
     */
    private void createProfileForUser(User user) {
        switch (user.getRole()) {
            case ADMIN:
                AdminProfile adminProfile = new AdminProfile();
                adminProfile.setUser(user);
                user.setAdminProfile(adminProfile);
                break;
            case RECRUITER:
                RecruiterProfile recruiterProfile = new RecruiterProfile();
                recruiterProfile.setUser(user);
                user.setRecruiterProfile(recruiterProfile);
                break;
            case CANDIDATE:
                CandidateProfile candidateProfile = new CandidateProfile();
                candidateProfile.setUser(user);
                user.setCandidateProfile(candidateProfile);
                break;
        }
    }
}