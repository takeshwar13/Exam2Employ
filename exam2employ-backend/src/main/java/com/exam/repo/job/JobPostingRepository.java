package com.exam.repo.job;

import com.exam.model.job.JobPosting;
import com.exam.model.profile.RecruiterProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {

    /**
     * Finds all job postings created by a specific recruiter.
     * @param recruiter The recruiter profile.
     * @return A list of job postings.
     */
    List<JobPosting> findByRecruiter(RecruiterProfile recruiter);
}