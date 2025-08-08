package com.examserver2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examserver2.dto.QuestionRequestDTO;
import com.examserver2.service.question.QuestionService;

@RestController
@RequestMapping("api/test")
public class QuestionController {
	
    @Autowired
    private QuestionService questionService;
    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/question")
	 public ResponseEntity<?> addQuestionInTest(@RequestBody QuestionRequestDTO dto) {
	        try {
//	        	System.out.println("hello i am here");
	            return new ResponseEntity<>(questionService.addQuestionInTest(dto), HttpStatus.CREATED);
	        } catch (Exception e) {
	            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	        }
	    }
	    
	    @PreAuthorize("hasRole('ADMIN')")
	    @PutMapping("/question/{id}")
	    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @RequestBody QuestionRequestDTO dto) {
	        try {
	            return new ResponseEntity<>(questionService.updateQuestion(id, dto), HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	        }
	    }

	    @PreAuthorize("hasRole('ADMIN')")
	    @DeleteMapping("/question/{id}")
	    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
	        try {
	            questionService.deleteQuestion(id);
	            return new ResponseEntity<>("Question deleted successfully", HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	        }
	    }
	    
	    @PreAuthorize("hasAnyRole('ADMIN','USER')")
	    @GetMapping("/{id}")
	    public ResponseEntity<?> getAllQuestions(@PathVariable Long id) {
	        try {
	            return new ResponseEntity<>(questionService.getAllQuestionsByTest(id), HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	        }
	    }

}
