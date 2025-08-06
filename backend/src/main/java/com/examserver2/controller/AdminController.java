package com.examserver2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.examserver2.dto.CandidateResultDTO;
import com.examserver2.service.admin.AdminService;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;


import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin("*")
public class AdminController {

	@Autowired
	private AdminService adminService;
    
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/search")
    public  ResponseEntity<List<CandidateResultDTO>> searchCandidates(
    		@RequestParam Long testId,
            @RequestParam(required = false) Double percentage

    ) {
    	List<CandidateResultDTO> results = adminService.searchCandidates(testId, percentage);
    	return ResponseEntity.ok(results);
    }
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/export")
	public void exportCandidatesToCsv(
	        @RequestParam Long testId,
	        @RequestParam(required = false) Double percentage,
	        HttpServletResponse response) throws IOException{

	    List<CandidateResultDTO> candidates = adminService.searchCandidates(testId, percentage);

	    // Set response headers
	    response.setContentType("text/csv");
	    response.setHeader("Content-Disposition", "attachment; filename=candidates.csv");

	    // Write CSV content
	    PrintWriter writer = response.getWriter();
	    if (candidates.isEmpty()) {
	        writer.println("No matching candidates found.");
	    } else {
	    	writer.println("Candidate Name, Email, Percentage, Test Title");
	    }

	    for (CandidateResultDTO candidate : candidates) {
	        writer.println(candidate.getName() + "," + candidate.getEmail() + "," + candidate.getPercentage() + "," + candidate.getTitle());
	    }

	    writer.flush();
	    writer.close();
	}
}
