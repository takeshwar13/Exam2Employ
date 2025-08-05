package com.examserver2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.examserver2.entities.User;
import com.examserver2.dto.CandidateResultDTO;
import com.examserver2.entities.TestResult;
import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<User, Long> {

    @Query("SELECT new com.examserver2.dto.CandidateResultDTO(" +
    	       "tr.percentage, tr.test.title) " +
    	       "FROM TestResult tr " +
    	       "WHERE tr.test.id = :testId " +
    	       "AND (:percentage IS NULL OR tr.percentage >= :percentage) ")
    	List<CandidateResultDTO> findCandidatesWithOptionalFilters(
    	    @Param("testId") Long testId,
    	    @Param("percentage") Double percentage
    	);
}
