package com.exam.dto.job;

import java.time.LocalDate;

public class JobPostingResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String location;
    private LocalDate postedDate;
    private Long recruiterId;     // Reference to RecruiterProfile
}

