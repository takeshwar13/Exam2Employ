package com.examserver2.dto;

public class CandidateResultDTO {

    private double percentage;
    private String title; // should match the field used in JPQL

    public CandidateResultDTO(double percentage, String title) {
        this.percentage = percentage;
        this.title = title;
    }

	public double getPercentage() {
		return percentage;
	}

	public void setPercentage(double percentage) {
		this.percentage = percentage;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}