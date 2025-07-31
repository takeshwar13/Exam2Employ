package com.exam.controller;

import com.exam.model.test.Test;
import com.exam.model.test.TestResult;
import com.exam.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tests")
@CrossOrigin("*")
public class TestController {

    @Autowired
    private TestService testService;

   
    /**
     * Endpoint for a CANDIDATE to start a test.
     * Returns a list of randomized questions without the answers.
     */
    @GetMapping("/{testId}/start")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<List<Map<String, Object>>> startTest(@PathVariable Long testId) {
        List<Map<String, Object>> questions = testService.startTest(testId);
        return ResponseEntity.ok(questions);
    }

    /**
     * Endpoint for a CANDIDATE to submit their answers.
     * The request body should contain the candidate's ID and a map of their answers.
     */
    @PostMapping("/{testId}/submit")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<TestResult> submitTest(@PathVariable Long testId, @RequestBody SubmissionPayload payload) {
        TestResult result = testService.submitTest(testId, payload.getCandidateId(), payload.getAnswers());
        return ResponseEntity.ok(result);
    }
}

/**
 * A helper class (DTO) to structure the submission request body.
 */
class SubmissionPayload {
    private Long candidateId;
    private Map<Long, String> answers;

    // Getters and Setters
    public Long getCandidateId() { return candidateId; }
    public void setCandidateId(Long candidateId) { this.candidateId = candidateId; }
    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
}