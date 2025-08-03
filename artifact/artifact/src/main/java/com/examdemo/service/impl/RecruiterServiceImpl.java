package com.examdemo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examdemo.model.profiles.Recruiter;
import com.examdemo.model.test.Result;
import com.examdemo.repository.RecruiterRepository;
import com.examdemo.service.RecruiterService;

@Service
public class RecruiterServiceImpl implements RecruiterService {

    @Autowired
    private RecruiterRepository recruiterRepository;

	@Override
	public void requestExam(int numberOfQuestions) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void assignExamToCandidate(Long examId, String candidateEmail) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Result> getResultsForCandidate(String candidateEmail) {
		// TODO Auto-generated method stub
		return null;
	}
}
