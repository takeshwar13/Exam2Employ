// Test.java (New File)
package com.exam.model.test;

import java.util.Set;

import com.exam.model.profile.AdminProfile;

import jakarta.persistence.*;

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
    @JoinColumn(name = "created_by_admin_id")
    private AdminProfile createdBy;
    
    // One Test can have many results
    @OneToMany(mappedBy = "test")
    private Set<TestResult> results;
    
 // ADDED: A Test is defined by a set of configurations.
    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<TestConfiguration> configurations;

    // Constructors, Getters, Setters
	

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

	public AdminProfile getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(AdminProfile createdBy) {
		this.createdBy = createdBy;
	}

	public Set<TestResult> getResults() {
		return results;
	}

	public void setResults(Set<TestResult> results) {
		this.results = results;
	}
	
	public Set<TestConfiguration> getConfigurations() {
		return configurations;
	}

	public void setConfigurations(Set<TestConfiguration> configurations) {
		this.configurations = configurations;
	}
    

    
    
}