package com.examserver2.mapper;

import com.examserver2.dto.TestResultDTO;
import com.examserver2.entities.TestResult;

public class TestResultMapper {

    public static TestResultDTO toDto(TestResult testResult) {
        if (testResult == null) {
            return null;
        }

        TestResultDTO dto = new TestResultDTO();
        dto.setId(testResult.getId());
        dto.setTotalQuestions(testResult.getTotalQuestions());
        dto.setCorrectAnswers(testResult.getCorrectAnswers());
        dto.setPercentage(testResult.getPercentage());

        // Safely extracting nested fields
        if (testResult.getTest() != null) {
            dto.setTestName(testResult.getTest().getTitle());
        }

        if (testResult.getUser() != null) {
            dto.setUserName(testResult.getUser().getName());
        }

        return dto;
    }
    
    public static TestResult toEntity(TestResultDTO testResultDTO) {
        TestResult testResult = new TestResult();

//        testResult.setTest(testResultDTO.getTestName());
//        testResult.setUser(testResultDTO.getUserName());
        testResult.setTotalQuestions(testResultDTO.getTotalQuestions());
        testResult.setCorrectAnswers(testResultDTO.getCorrectAnswers());
        testResult.setPercentage(testResultDTO.getPercentage());

        return testResult;
    }

    
}

