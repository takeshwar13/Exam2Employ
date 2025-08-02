package com.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.exam.model.profile.*;
import com.exam.service.RecruiterToolsService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/candidates")
public class RecruiterToolsContoller {

	   @Autowired
	    private RecruiterToolsService recuiterToolsService;
    @GetMapping("/search")
    public  ResponseEntity<List<CandidateProfile>> searchCandidates(

    ) {
    	  return ResponseEntity.ok(recuiterToolsService.searchCandidates());
    }
}