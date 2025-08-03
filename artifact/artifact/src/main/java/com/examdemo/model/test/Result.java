package com.examdemo.model.test;import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import com.examdemo.model.test.Exam;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Result {
    @Id
    @GeneratedValue
    private Long id;

    private String candidateEmail;
    private int score;

    @ManyToOne
    private Exam exam;  // yaha pr   private Long examId;
}


