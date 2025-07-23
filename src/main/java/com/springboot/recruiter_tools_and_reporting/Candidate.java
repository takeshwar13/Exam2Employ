package com.springboot.recruiter_tools_and_reporting;

public class Candidate {
    private String name;
    private String email;
    private String testName;
    private int score;
    private String skills;
    private String status;

    // 🔹 Getters
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getTestName() {
        return testName;
    }

    public int getScore() {
        return score;
    }

    public String getSkills() {
        return skills;
    }

    public String getStatus() {
        return status;
    }

    // 🔹 Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

