package com.examdemo.mapper;

import com.examdemo.dto.ResultDTO;
import com.examdemo.model.test.Exam;
import com.examdemo.model.test.Result;

public class ResultMapper {

    public static ResultDTO toDTO(Result result) {
        return new ResultDTO(
            result.getId(),
            result.getCandidateEmail(),
            result.getExam() != null ? result.getExam().getId() : null,
            result.getExam() != null ? result.getExam().getTitle() : null,
            result.getScore()
        );
    }

    public static Result toEntity(ResultDTO dto, Exam exam) {
        Result result = new Result();
        result.setId(dto.getResultId()); // Optional: depends on use-case
        result.setCandidateEmail(dto.getCandidateEmail());
        result.setExam(exam); // Injected by service layer
        result.setScore(dto.getScore());
        return result;
    }
}

