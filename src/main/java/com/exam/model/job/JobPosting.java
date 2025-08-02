package com.exam.model.job;

import java.time.LocalDate;

import com.exam.model.profile.RecruiterProfile;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "job_posting")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String location;
    private LocalDate postedDate;

    @ManyToOne
    @JoinColumn(name = "recruiter_profile_id")
    private RecruiterProfile recruiter;
}
