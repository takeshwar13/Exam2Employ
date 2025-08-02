package com.exam.model.profile;

import com.exam.model.auth.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;  // ADMIN, RECRUITER, CANDIDATE

    private boolean isApproved;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private RecruiterProfile recruiterProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private AdminProfile adminProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private CandidateProfile candidateProfile;
}
