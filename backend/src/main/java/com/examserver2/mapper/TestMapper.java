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
        dto.setTime(test.getTime());
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
}
