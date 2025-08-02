package com.exam.model.test;

import java.util.Set;

import com.exam.model.profile.RecruiterProfile;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "test")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private int durationInMinutes;

    @ManyToOne
    @JoinColumn(name = "created_by_recruiter_id")
    private RecruiterProfile createdBy;

    @OneToMany(mappedBy = "test")
    private Set<TestResult> results;
}
