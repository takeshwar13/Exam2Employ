package com.exam.security;

import com.exam.model.auth.AuthProvider;
import com.exam.model.auth.Role;
import com.exam.model.profile.CandidateProfile;
import com.exam.model.profile.User;
import com.exam.repo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String email = oauth2User.getAttribute("email");
        User user = userRepository.findByUsername(email);

        if (user == null) {
            // If user doesn't exist, create a new one
            user = registerNewOAuthUser(userRequest, oauth2User);
        } else {
            // If user exists, update their details from the social profile
            user = updateExistingOAuthUser(user, oauth2User);
        }

        return CustomUserDetails.create(user, oauth2User.getAttributes());
    }

    private User registerNewOAuthUser(OAuth2UserRequest userRequest, OAuth2User oauth2User) {
        User newUser = new User();
        String provider = userRequest.getClientRegistration().getRegistrationId();
        
        newUser.setAuthProvider(AuthProvider.valueOf(provider.toUpperCase()));
        newUser.setUsername(oauth2User.getAttribute("email"));
        newUser.setRole(Role.CANDIDATE); // Default role for social logins
        newUser.setApproved(true); // Auto-approve social logins
        
        // Social logins don't have a password, so we set a random, encoded one
        newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));

        // Create a candidate profile for the new user
        CandidateProfile candidateProfile = new CandidateProfile();
        candidateProfile.setUser(newUser);
        newUser.setCandidateProfile(candidateProfile);

        return userRepository.save(newUser);
    }

    private User updateExistingOAuthUser(User existingUser, OAuth2User oAuth2User) {
        // Here you could update user details like name or profile picture URL
        // For now, we'll just return the existing user.
        return existingUser;
    }
}