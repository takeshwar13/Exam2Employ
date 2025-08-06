package com.examserver2.service.admin;

import java.util.List;

import com.examserver2.dto.CandidateResultDTO;

public interface AdminService {
	public List<CandidateResultDTO> searchCandidates(Long testId, Double percentage);	
}
