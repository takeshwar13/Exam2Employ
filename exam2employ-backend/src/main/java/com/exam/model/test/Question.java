package com.exam.model.test;


import java.util.Set;

import jakarta.persistence.*;


@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 5000)
    private String content; // Sawaal ka text

    private Integer marks;

 // Correct answer ka text yaha store kar sakte hain for quick checking
    private String answer;

    // Ek Question ke dher saare Options ho sakte hain
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Option> options;

    // Dher saare Questions ek Test ka hissa ho sakte hain
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;


    // Getters and Setters
	public Question() {
		super();
	}

	public Question(Long id, String content, Integer marks, Set<Option> options, Category category, String answer) {
		super();
		this.id = id;
		this.content = content;
		this.marks = marks;
		this.options = options;
		this.category = category;
		this.answer = answer;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getMarks() {
		return marks;
	}

	public void setMarks(Integer marks) {
		this.marks = marks;
	}

	public Set<Option> getOptions() {
		return options;
	}

	public void setOptions(Set<Option> options) {
		this.options = options;
	}

	public Category getCategory() {
		return category;
	}

	public void setTest(Category category) {
		this.category = category;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}


}