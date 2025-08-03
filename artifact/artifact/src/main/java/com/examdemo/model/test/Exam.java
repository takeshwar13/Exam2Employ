package com.examdemo.model.test;

import java.time.LocalDateTime;
import java.util.List;

import com.examdemo.model.profiles.Admin;
import com.examdemo.model.profiles.Recruiter;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Exam {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private int questionCount;
    private LocalDateTime date;
    private int durationMinutes;

    @ManyToOne
    private Recruiter requestedBy;

    @ManyToOne
    private Admin createdBy;

    @ManyToMany
    private List<Question> questions;
}
