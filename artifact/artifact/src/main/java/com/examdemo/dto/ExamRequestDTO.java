package com.examdemo.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class ExamRequestDTO {
    private String title;
    private int questionCount;
    private Long recruiterId;
    private LocalDateTime date;
    private int durationMinutes;
}
