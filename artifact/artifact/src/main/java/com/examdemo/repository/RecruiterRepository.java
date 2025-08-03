package com.examdemo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examdemo.model.profiles.Recruiter;

@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {
    // Custom finder methods can go here
    List<Recruiter> findByIsApproved(boolean isApproved);
    Optional<Recruiter> findByEmail(String email);
}

