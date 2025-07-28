package com.exam.service;
import com.exam.model.profile.User;
import java.util.Optional;
import java.util.List;
public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    Optional<User> getUserByUsername(String username);
    User createUser(User user);
    void deleteUser(Long id);
}