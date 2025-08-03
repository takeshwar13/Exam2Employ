package com.examdemo.service;

import java.util.List;

import com.examdemo.dto.ResultDTO;
import com.examdemo.model.test.Result;

public interface RecruiterService {
	public void requestExam(int numberOfQuestions);
	public void assignExamToCandidate(Long examId, String candidateEmail);
	public List<Result> getResultsForCandidate(String candidateEmail);
	

}
