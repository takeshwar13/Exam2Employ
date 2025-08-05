package com.examserver2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examserver2.dto.CandidateResultDTO;
import com.examserver2.service.admin.AdminService;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin("*")
public class AdminController {

	@Autowired
	private AdminService adminService;
    
	@GetMapping("/search")
    public  ResponseEntity<List<CandidateResultDTO>> searchCandidates(
    		@RequestParam Long testId,
            @RequestParam(required = false) Double percentage

    ) {
    	List<CandidateResultDTO> results = adminService.searchCandidates(testId, percentage);
    	return ResponseEntity.ok(results);
    }
}
