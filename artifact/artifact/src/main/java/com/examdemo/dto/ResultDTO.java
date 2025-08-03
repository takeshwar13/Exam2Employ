package com.examdemo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultDTO {
    private Long resultId;
    private String candidateEmail;
    private Long examId;
    private String examTitle;
    private int score;
}

