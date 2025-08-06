package com.examserver2.dto;

import lombok.Data;

@Data
public class QuestionResponseDTO {
    private Long id;
    private String questionText;
    private String correctOption;
    private Long testId;
}
