package com.exam.repo.job;

import com.exam.model.job.JobApplication;
import com.exam.model.job.JobPosting;
import com.exam.model.profile.CandidateProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    /**
     * Finds all job applications submitted by a specific candidate.
     * @param candidate The candidate profile.
     * @return A list of job applications.
     */
    List<JobApplication> findByCandidate(CandidateProfile candidate);

    /**
     * Finds all applications for a specific job posting.
     * @param jobPosting The job posting entity.
     * @return A list of job applications.
     */
    List<JobApplication> findByJob(JobPosting jobPosting);
}