package com.examserver2.dto;

import lombok.Data;

@Data
public class TestResultDTO {
	
	private Long id;

    private int totalQuestions;
    private int correctAnswers;
    private double percentage;

    private Long testId;
    private String testName; // Added for frontend display
    private Long userId;
    private int timeSpentSeconds;
}
