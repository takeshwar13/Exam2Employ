package com.exam.repository;

import com.exam.model.profile.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a User entity by its username.
     *
     * @param username The username to search for.
     * @return An Optional containing the User if found, otherwise an empty Optional.
     */
    Optional<User> findByUsername(String username);
}
