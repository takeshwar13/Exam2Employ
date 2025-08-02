package com.exam.repository;

import com.exam.dto.CandidateResult.CandidateResultDTO;
import com.exam.model.profile.CandidateProfile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruiterToolsRepository extends JpaRepository<CandidateProfile, Long> {

    @Query("SELECT new com.exam.dto.CandidateResult.CandidateResultDTO(" +
           "tr.candidate.skills, tr.score, tr.test.title) " +
           "FROM TestResult tr " +
           "WHERE tr.test.id = :testId " +
           "AND tr.score >= :minScore")
    List<CandidateResultDTO> findCandidatesByTestAndScore(
        @Param("testId") Long testId,
        @Param("minScore") int minScore
    );
}
