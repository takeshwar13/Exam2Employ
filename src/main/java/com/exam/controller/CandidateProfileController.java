package com.exam.controller;

import com.exam.model.profile.CandidateProfile;
import com.exam.service.CandidateProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidate-profile")
public class CandidateProfileController {

    @Autowired
    private CandidateProfileService candidateProfileService;

    @PostMapping("/create")
    public ResponseEntity<CandidateProfile> createProfile(@RequestBody CandidateProfile profile) {
        return ResponseEntity.ok(candidateProfileService.saveCandidateProfile(profile));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CandidateProfile>> getAllProfiles() {
        return ResponseEntity.ok(candidateProfileService.getAllCandidateProfiles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidateProfile> getProfileById(@PathVariable Long id) {
        return candidateProfileService.getCandidateProfileById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<CandidateProfile> getByUserId(@PathVariable Long userId) {
        return candidateProfileService.getByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CandidateProfile> updateProfile(@PathVariable Long id, @RequestBody CandidateProfile updatedProfile) {
        return ResponseEntity.ok(candidateProfileService.updateCandidateProfile(id, updatedProfile));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        candidateProfileService.deleteCandidateProfile(id);
        return ResponseEntity.ok().build();
    }
}

