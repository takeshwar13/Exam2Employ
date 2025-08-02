package com.exam.dto.CandidateResult;


public class CandidateResultDTO {

    private String skills;
    private int score;
    private String title; // should match the field used in JPQL

    public CandidateResultDTO(String skills, int score, String title) {
        this.skills = skills;
        this.score = score;
        this.title = title;
    }

	public String getSkills() {
		return skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

    // Getters & setters (optional if using Lombok)
}