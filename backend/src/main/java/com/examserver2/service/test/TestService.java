package com.examserver2.service.test;

import java.util.List;

import com.examserver2.dto.QuestionRequestDTO;
import com.examserver2.dto.QuestionResponseDTO;
import com.examserver2.dto.SubmitTestDTO;
import com.examserver2.dto.TestDTO;
import com.examserver2.dto.TestDetailsDTO;
import com.examserver2.dto.TestResultDTO;

public interface TestService {
	
	public TestDTO createTest(TestDTO dto);
	public QuestionResponseDTO addQuestionInTest(QuestionRequestDTO dto);
	public List<TestDTO> getAllTests();
	public TestDetailsDTO getAllQuestionsByTest(Long id) ;
	
	public TestResultDTO submitTest(SubmitTestDTO request);
	
	public List<TestResultDTO> getAllTestResults();
	
	public List<TestResultDTO> getAllTestResultsOfUser(Long userId);
	
}
