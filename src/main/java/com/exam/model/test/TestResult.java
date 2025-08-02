package com.exam.model.test;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.exam.model.profile.CandidateProfile;
import lombok.*;

@Entity
@Table(name = "test_result")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private CandidateProfile candidate;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    private int score;
    private LocalDateTime completedAt;
}
