package com.examserver2.service.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examserver2.entities.User;
import com.examserver2.enums.UserRole;
import com.examserver2.repository.UserRepository;
import com.examserver2.config.PasswordUtil;

import jakarta.annotation.PostConstruct;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    // Only create a default admin if no admin exists, but do not restrict login to this account.
    @PostConstruct
    private void createAdminUser() {
        if (userRepository.findByRole(UserRole.ADMIN).isEmpty()) {
            User user = new User();
            user.setName("Admin");
            user.setEmail("admin@gmail.com");
            user.setRole(UserRole.ADMIN);
            // Always encode the password for the default admin
            String rawPassword = "admin";
            user.setPassword(PasswordUtil.encode(rawPassword));
            userRepository.save(user);
        }
    }
    
    public Boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email) != null;
    }
    
    public User createUser(User user) {
        // If role is not set, default to USER
        if (user.getRole() == null) {
            user.setRole(UserRole.USER);
        }
        // Only encode if not already encoded (BCrypt hash starts with $2)
        String password = user.getPassword();
        if (password != null && !password.startsWith("$2")) {
            user.setPassword(PasswordUtil.encode(password));
        }
        return userRepository.save(user);
    }
    
    public User login(User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if (optionalUser.isPresent()) {
            String encodedPassword = optionalUser.get().getPassword();
            if (PasswordUtil.matches(user.getPassword(), encodedPassword)) {
                return optionalUser.get();
            }
        }
        return null;
    }
    
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

