package com.exam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.profile.CandidateProfile;
import com.exam.repository.RecruiterToolsRepository;

@Service
public class RecruiterToolsService {

    @Autowired
    private RecruiterToolsRepository recruiterToolsRepository;

    
    public List<CandidateProfile> searchCandidates() {
        return recruiterToolsRepository.findAll();
    }
    
}