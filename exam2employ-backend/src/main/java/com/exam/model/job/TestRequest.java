package com.exam.model.job;

import com.exam.model.profile.RecruiterProfile;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class TestRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The recruiter who made the request
    @ManyToOne
    @JoinColumn(name = "recruiter_profile_id")
    private RecruiterProfile recruiter;
    
    // A brief summary of subjects needed, e.g., "Core Java and SQL Basics"
    private String subjectSummary;
    
    // Status of the request
    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private LocalDateTime requestDate;
    
    private String adminNotes; // For admins to add comments on approval/rejection

    public enum RequestStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

	

    // Constructors, Getters, and Setters
    public void setStatus(RequestStatus pending) {
		this.status=status;
		
	}

	public void setRequestDate(LocalDateTime now) {
		this.requestDate=requestDate;
		
	}

	public void setAdminNotes(String adminNotes2) {
		this.adminNotes=adminNotes;
		
	}
}