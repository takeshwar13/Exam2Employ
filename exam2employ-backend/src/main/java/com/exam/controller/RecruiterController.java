package com.exam.controller;


import com.exam.model.job.TestRequest;
import com.exam.service.TestRequestService; // You will need to create this service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiter")
@CrossOrigin("*")
public class RecruiterController {

    @Autowired
    private TestRequestService testRequestService;

    /**
     * Endpoint for a RECRUITER to submit a new request for a test.
     */
    @PostMapping("/test-requests")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<TestRequest> requestTest(@RequestBody TestRequest testRequest) {
        TestRequest createdRequest = testRequestService.createTestRequest(testRequest);
        return ResponseEntity.ok(createdRequest);
    }
}
