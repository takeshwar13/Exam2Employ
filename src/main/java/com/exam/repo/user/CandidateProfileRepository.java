package com.exam.repo.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exam.model.profile.CandidateProfile;

@Repository
public interface CandidateProfileRepository extends JpaRepository<CandidateProfile, Long> {

	
}
