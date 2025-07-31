package com.exam.model.job;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.exam.model.profile.CandidateProfile;

@Entity
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ek candidate dher saari applications de sakta hai
    @ManyToOne
    @JoinColumn(name = "candidate_profile_id")
    private CandidateProfile candidate;

    // Ek Job ke liye dher saari applications aa sakti hain
    @ManyToOne
    @JoinColumn(name = "job_posting_id")
    private JobPosting job;

    private String status; // e.g., "APPLIED", "REVIEWING", "SHORTLISTED"
    private LocalDateTime applicationDate;
    
    // Getters and Setters
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public CandidateProfile getCandidate() {
		return candidate;
	}
	public void setCandidate(CandidateProfile candidate) {
		this.candidate = candidate;
	}
	public JobPosting getJob() {
		return job;
	}
	public void setJob(JobPosting job) {
		this.job = job;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDateTime getApplicationDate() {
		return applicationDate;
	}
	public void setApplicationDate(LocalDateTime applicationDate) {
		this.applicationDate = applicationDate;
	} 
}