package com.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.exam.dto.CandidateResult.CandidateResultDTO;
import com.exam.service.RecruiterToolsService;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class RecruiterToolsContoller {

	@Autowired
	private RecruiterToolsService recuiterToolsService;
    
	@GetMapping("/search")
    public  ResponseEntity<List<CandidateResultDTO>> searchCandidates(
    		@RequestParam Long testId,
            @RequestParam int minScore

    ) {
    	List<CandidateResultDTO> results = recuiterToolsService.searchCandidates(testId, minScore);
    	return ResponseEntity.ok(results);
    }
}