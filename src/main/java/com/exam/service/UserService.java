package com.exam.service;

import com.exam.dto.profile.UserDTO;

import java.util.List;

/**
 * Interface for User-related business logic.
 */
public interface UserService {

    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserById(Long id);
    UserDTO getUserByUsername(String username);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
}
