package com.examserver2.mapper;

import com.examserver2.dto.QuestionRequestDTO;
import com.examserver2.dto.QuestionResponseDTO;
import com.examserver2.dto.QuestionResponseDTO2;
import com.examserver2.entities.Question;

import org.springframework.stereotype.Component;

@Component
public class QuestionMapper {

    public static QuestionResponseDTO toResponseDTO(Question question) {
        if (question == null) return null;

        QuestionResponseDTO dto = new QuestionResponseDTO();
        dto.setId(question.getId());
        dto.setQuestionText(question.getQuestionText());
        dto.setCorrectOption(question.getCorrectOption());
        dto.setTestId(question.getTest().getId()); // assuming `Question` has a Test relationship

        return dto;
    }
    

    public static QuestionResponseDTO2 toResponseDTO2(Question question) {
        if (question == null) return null;

        QuestionResponseDTO2 dto = new QuestionResponseDTO2();
        dto.setQuestionId(question.getId());
        dto.setSelectedOption(question.getCorrectOption());
    
        return dto;
    }
    
    

    public static Question toEntity(QuestionRequestDTO dto) {
        if (dto == null) return null;

        Question question = new Question();
        question.setQuestionText(dto.getQuestionText());
        question.setOptionA(dto.getOptionA());
        question.setOptionB(dto.getOptionB());
        question.setOptionC(dto.getOptionC());
        question.setOptionD(dto.getOptionD());
        question.setCorrectOption(dto.getCorrectOption());

        // `test` should be set externally based on `testId`
        return question;
    }
}
