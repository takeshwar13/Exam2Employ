package com.examserver2.service.test;

import java.util.List;

import com.examserver2.dto.SubmitTestDTO;
import com.examserver2.dto.TestDTO;
import com.examserver2.dto.TestResultDTO;

public interface TestService {
	
	public TestDTO createTest(TestDTO dto);
	
	public List<TestDTO> getAllTests();
	
	public TestResultDTO submitTest(SubmitTestDTO request);
	
	public List<TestResultDTO> getAllTestResults();
	
	public List<TestResultDTO> getAllTestResultsOfUser(Long userId);

	TestDTO updateTest(Long id, TestDTO dto); 

    void deleteTest(Long id); 
    
    boolean hasUserAttemptedTest(Long userId, Long testId);
}
