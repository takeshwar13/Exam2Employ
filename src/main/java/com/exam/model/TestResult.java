// Rename CandidateTest.java to TestResult.java and update it

package com.exam.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class TestResult { // Renamed from CandidateTest

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many results can belong to one candidate
    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private CandidateProfile candidate;

    // Many results can belong to one test
    @ManyToOne
    @JoinColumn(name = "test_id") // Replaces `testName` string
    private Test test;

    private int score;
    private LocalDateTime completedAt;
    
    // Constructors, Getters, Setters 
	public TestResult() {
		super();
	}
	
	public TestResult(Long id, CandidateProfile candidate, Test test, int score, LocalDateTime completedAt) {
		super();
		this.id = id;
		this.candidate = candidate;
		this.test = test;
		this.score = score;
		this.completedAt = completedAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public CandidateProfile getCandidate() {
		return candidate;
	}
	public void setCandidate(CandidateProfile candidate) {
		this.candidate = candidate;
	}
	public Test getTest() {
		return test;
	}
	public void setTest(Test test) {
		this.test = test;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public LocalDateTime getCompletedAt() {
		return completedAt;
	}
	public void setCompletedAt(LocalDateTime completedAt) {
		this.completedAt = completedAt;
	}

}