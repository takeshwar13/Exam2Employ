package com.exam.dto.job;

import java.time.LocalDateTime;

public class JobApplicationDTO {
    private Long id;
    private Long candidateId;      // CandidateProfile ID only
    private Long jobId;            // JobPosting ID only
    private String status;
    private LocalDateTime applicationDate;
}

