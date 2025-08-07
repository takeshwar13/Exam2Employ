package com.examserver2.service.question;

import com.examserver2.dto.QuestionRequestDTO;

public interface QuestionService {
    Object addQuestionInTest(QuestionRequestDTO dto);
    Object updateQuestion(Long id, QuestionRequestDTO dto);
    void deleteQuestion(Long id);
    Object getAllQuestionsByTest(Long testId);
}

