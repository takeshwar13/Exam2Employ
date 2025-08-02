package com.exam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.dto.CandidateResult.CandidateResultDTO;
import com.exam.repository.RecruiterToolsRepository;

@Service
public class RecruiterToolsService {

    @Autowired
    private RecruiterToolsRepository recruiterToolsRepository;

    
    public List<CandidateResultDTO> searchCandidates(
            Long testId,
            Integer minScore,
            String skills
          ) {
    	 return recruiterToolsRepository.findCandidatesWithOptionalFilters(testId, minScore, skills);
    }
    
}