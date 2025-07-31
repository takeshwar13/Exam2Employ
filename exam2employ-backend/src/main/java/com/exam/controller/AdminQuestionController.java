package com.exam.controller;


import com.exam.model.test.Category;
import com.exam.model.test.Question;
import com.exam.model.test.Test;
import com.exam.service.QuestionService;
import com.exam.service.TestRequestService;
import com.exam.service.TestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminQuestionController {

    @Autowired
    private QuestionService questionService;
    
    @Autowired
    private TestService testService; // For creating the test

    @Autowired
    private TestRequestService testRequestService; // For managing requests

    // Endpoints for adding categories and questions remain the same...
    /**
     * Endpoint for an ADMIN to add a new question category.
     */
    @PostMapping("/categories")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category newCategory = questionService.addCategory(category);
        return ResponseEntity.ok(newCategory);
    }

    /**
     * Endpoint for an ADMIN to add a new question to the question bank.
     */
    @PostMapping("/questions")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        Question newQuestion = questionService.addQuestion(question);
        return ResponseEntity.ok(newQuestion);
    }
    
    /**
     * Endpoint for an ADMIN to delete a question.
     */
    @DeleteMapping("/questions/{questionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.ok("Question deleted successfully");
    }
    /**
     * Endpoint for an ADMIN to view all pending test requests.
     */
    @GetMapping("/test-requests/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getPendingTestRequests() {
        // Logic to fetch pending requests from testRequestService
        return ResponseEntity.ok(testRequestService.getPendingRequests());
    }
    
    /**
     * Endpoint for an ADMIN to approve a test request and create the actual test.
     * The request body will contain the full Test object, including its configurations.
     */
    @PostMapping("/test-requests/{requestId}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Test> approveTestRequest(@PathVariable Long requestId, @RequestBody Test test) {
        // 1. Update the status of the request to APPROVED
        testRequestService.approveRequest(requestId);
        
        // 2. Create the actual test using the provided configuration
        Test createdTest = testService.createTest(test);
        
        return ResponseEntity.ok(createdTest);
    }

}