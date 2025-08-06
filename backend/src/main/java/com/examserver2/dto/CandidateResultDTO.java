package com.examserver2.dto;

public class CandidateResultDTO {

    private double percentage;
    private String title;
    private String name;
    private String email;

    public CandidateResultDTO(double percentage, String title, String name, String email) {
        this.percentage = percentage;
        this.title = title;
        this.name = name;
        this.email = email;
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
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}