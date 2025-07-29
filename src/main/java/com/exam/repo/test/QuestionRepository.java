package com.exam.repo.test;


import com.exam.model.test.Category;
import com.exam.model.test.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    /**
     * Finds all questions belonging to a specific category.
     * @param category The category entity.
     * @return A set of questions.
     */
    Set<Question> findByCategory(Category category);

    /**
     * Fetches a specified number of random questions from a given category.
     * This query uses database-specific functions for randomization (ORDER BY RAND() for MySQL).
     * @param categoryId The ID of the category from which to fetch questions.
     * @param limit The maximum number of random questions to return.
     * @return A list of random Question objects.
     */
    @Query(value = "SELECT * FROM question WHERE category_id = :categoryId ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomQuestionsByCategory(@Param("categoryId") Long categoryId, @Param("limit") int limit);
}