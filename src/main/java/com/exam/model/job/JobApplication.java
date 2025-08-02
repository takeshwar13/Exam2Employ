package com.exam.model.job;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.exam.model.profile.CandidateProfile;
import lombok.*;

@Entity
@Table(name = "job_application")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "candidate_profile_id")
    private CandidateProfile candidate;

    @ManyToOne
    @JoinColumn(name = "job_posting_id")
    private JobPosting job;

    private String status; // e.g., "APPLIED", "REVIEWING", "SHORTLISTED"
    private LocalDateTime applicationDate;
}
