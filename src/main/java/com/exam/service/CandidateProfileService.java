package com.exam.service;

import com.exam.model.profile.CandidateProfile;
import com.exam.repository.CandidateProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidateProfileService {

    @Autowired
    private CandidateProfileRepository candidateProfileRepository;

    public CandidateProfile saveCandidateProfile(CandidateProfile profile) {
        return candidateProfileRepository.save(profile);
    }

    public List<CandidateProfile> getAllCandidateProfiles() {
        return candidateProfileRepository.findAll();
    }

    public Optional<CandidateProfile> getCandidateProfileById(Long id) {
        return candidateProfileRepository.findById(id);
    }

    public Optional<CandidateProfile> getByUserId(Long userId) {
        return candidateProfileRepository.findByUserId(userId);
    }

    public CandidateProfile updateCandidateProfile(Long id, CandidateProfile updatedProfile) {
        return candidateProfileRepository.findById(id)
                .map(existing -> {
                    existing.setHighestQualification(updatedProfile.getHighestQualification());
                    existing.setSkills(updatedProfile.getSkills());
                    existing.setResumeUrl(updatedProfile.getResumeUrl());
                    return candidateProfileRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("CandidateProfile not found with id: " + id));
    }

    public void deleteCandidateProfile(Long id) {
        candidateProfileRepository.deleteById(id);
    }
}
