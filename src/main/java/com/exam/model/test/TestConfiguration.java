package com.exam.model.test;

import jakarta.persistence.*;

/**
 * Defines the structure of a test by linking a Test to a Category
 * and specifying how many questions to draw from that category.
 */
@Entity

public class TestConfiguration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The test this configuration belongs to
    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    // The category from which to draw questions
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // The number of questions to randomly select from the category
    private int numberOfQuestions;

    // Constructors
    public TestConfiguration() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getNumberOfQuestions() {
        return numberOfQuestions;
    }

    public void setNumberOfQuestions(int numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions;
    }
}