package com.examserver2.mapper;


import com.examserver2.dto.TestDTO;
import com.examserver2.entities.Test;


public class TestMapper {

    public static TestDTO toDTO(Test test) {
        if (test == null) return null;

        TestDTO dto = new TestDTO();
        dto.setId(test.getId());
        dto.setTitle(test.getTitle());
        dto.setDescription(test.getDescription());
        // Calculate total time as time per question * number of questions
        Long timePerQuestion = test.getTime() != null ? test.getTime() : 0L;
        int numQuestions = (test.getQuestions() != null) ? test.getQuestions().size() : 0;
        dto.setTime(timePerQuestion * numQuestions);
        return dto;
    }

    public static Test toEntity(TestDTO dto) {
        if (dto == null) return null;

        Test test = new Test();
        test.setId(dto.getId());
        test.setTitle(dto.getTitle());
        test.setDescription(dto.getDescription());
        test.setTime(dto.getTime());
        return test;
    }
    
    public static void updateEntityFromDTO(Test test, TestDTO dto) {
        if (test == null || dto == null) return;

        test.setTitle(dto.getTitle());
        test.setDescription(dto.getDescription());
        test.setTime(dto.getTime()); // time per question
    }
}
