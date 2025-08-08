package com.examserver2.service.user;

import java.util.List;

import com.examserver2.entities.User;

public interface UserService {
	
	 public Boolean hasUserWithEmail(String email);
	 public User createUser(User user);
	 public User login(User user);
	 void deleteUser(Long id);
	 public List<User> getAllUsers();
}
