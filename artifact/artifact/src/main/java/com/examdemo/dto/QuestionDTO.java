package com.examdemo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionDTO {
    private String content;
    private String difficultyLevel;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;
    private String topic;
}
