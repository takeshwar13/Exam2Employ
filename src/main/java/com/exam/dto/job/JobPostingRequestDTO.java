package com.exam.dto.job;

import java.time.LocalDate;

public class JobPostingRequestDTO {
    private String title;
    private String description;
    private String location;
    private LocalDate postedDate;
    private Long recruiterId;     // RecruiterProfile FK
}

