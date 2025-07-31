package com.exam.service.impl;

import com.exam.model.test.Category;
import com.exam.model.test.Question;
import com.exam.repo.test.CategoryRepository;
import com.exam.repo.test.QuestionRepository;
import com.exam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Category addCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Question addQuestion(Question question) {
        // Ensure the question has a valid category attached before saving
        if (question.getCategory() == null || question.getCategory().getId() == null) {
            throw new IllegalArgumentException("Question must have a valid category.");
        }
        return this.questionRepository.save(question);
    }

    @Override
    public Set<Question> getQuestionsByCategory(Category category) {
        return this.questionRepository.findByCategory(category);
    }

    @Override
    public void deleteQuestion(Long questionId) {
        this.questionRepository.deleteById(questionId);
    }
}