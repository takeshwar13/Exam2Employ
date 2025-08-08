package com.examserver2.dto;

import lombok.Data;

@Data
public class QuestionResponseDTO {
    private Long id;
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctOption;
    private Long testId;
}
