package com.exam.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.model.profile.CandidateProfile;

import java.util.List;
import java.util.Optional;

public interface RecruiterToolsRepository extends JpaRepository<CandidateProfile, Long> {
    Optional<CandidateProfile> findByUserId(Long userId);
    List<CandidateProfile> findAll();
}

