package com.exam.model.profile;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "candidate_profile")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateProfile {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String highestQualification;
    private String skills;       // e.g., "Java, React, SQL"
    private String resumeUrl;    // resume file or link
}
