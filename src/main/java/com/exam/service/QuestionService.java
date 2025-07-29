package com.exam.service;


import com.exam.model.test.Category;
import com.exam.model.test.Question;
import java.util.Set;

public interface QuestionService {

    /**
     * Adds a new category to the system.
     * @param category The Category object to be saved.
     * @return The saved Category object.
     */
    Category addCategory(Category category);

    /**
     * Adds a new question to the question bank.
     * @param question The Question object to be saved.
     * @return The saved Question object.
     */
    Question addQuestion(Question question);

    /**
     * Retrieves all questions belonging to a specific category.
     * @param category The category to filter by.
     * @return A set of questions from the given category.
     */
    Set<Question> getQuestionsByCategory(Category category);

    /**
     * Deletes a question from the system.
     * @param questionId The ID of the question to delete.
     */
    void deleteQuestion(Long questionId);
}