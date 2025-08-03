package com.examdemo.model.test;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Question {
    @Id
    @GeneratedValue
    private Long id;

    private String content;
    private String difficultyLevel;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    private String correctAnswer;
    private String topic;
}
