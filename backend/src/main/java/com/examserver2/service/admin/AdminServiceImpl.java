package com.examserver2.service.admin;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examserver2.dto.CandidateResultDTO;
import com.examserver2.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;
    
    public List<CandidateResultDTO> searchCandidates(
            Long testId,
            Double percentage
          ) {
    	 		return adminRepository.findCandidatesWithOptionalFilters(testId, percentage);
    }
    
}

