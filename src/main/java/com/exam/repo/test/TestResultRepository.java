package com.exam.repo.test;

import com.exam.model.profile.CandidateProfile;
import com.exam.model.test.Test;
import com.exam.model.test.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {

    /**
     * Finds all test results for a specific candidate.
     * @param candidate The candidate profile.
     * @return A list of test results.
     */
    List<TestResult> findByCandidate(CandidateProfile candidate);

    /**
     * Finds all test results for a specific test.
     * @param test The test entity.
     * @return A list of test results.
     */
    List<TestResult> findByTest(Test test);
}