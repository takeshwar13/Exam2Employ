// Test.java (New File)
package com.exam.model;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private int durationInMinutes;

    // A test can be created by a Recruiter
    @ManyToOne
    @JoinColumn(name = "created_by_recruiter_id")
    private RecruiterProfile createdBy;
    
    // One Test can have many results
    @OneToMany(mappedBy = "test")
    private Set<TestResult> results;

    // Constructors, Getters, Setters
	public Test() {
		super();
	}

	public Test(Long id, String title, String description, int durationInMinutes, RecruiterProfile createdBy,
			Set<TestResult> results) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.durationInMinutes = durationInMinutes;
		this.createdBy = createdBy;
		this.results = results;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getDurationInMinutes() {
		return durationInMinutes;
	}

	public void setDurationInMinutes(int durationInMinutes) {
		this.durationInMinutes = durationInMinutes;
	}

	public RecruiterProfile getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(RecruiterProfile createdBy) {
		this.createdBy = createdBy;
	}

	public Set<TestResult> getResults() {
		return results;
	}

	public void setResults(Set<TestResult> results) {
		this.results = results;
	}
    

    
    
}