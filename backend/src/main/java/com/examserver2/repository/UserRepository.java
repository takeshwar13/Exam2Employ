package com.examserver2.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examserver2.entities.User;
import com.examserver2.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByRole(UserRole role);
    
    User findFirstByEmail(String email);
    
    Optional<User> findByEmail(String email);
}
