package com.examdemo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examdemo.model.test.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByDifficultyLevel(String level);

    @Query("SELECT q FROM Question q ORDER BY RAND() LIMIT :count")
    List<Question> findRandomQuestions(@Param("count") int count); // For random selection
}
