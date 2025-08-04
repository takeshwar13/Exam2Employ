package com.examserver2.dto;

import java.util.List;

import lombok.Data;

@Data
public class TestDetailsDTO {
    private TestDTO testDTO;
    private List<QuestionResponseDTO> questions;
}

