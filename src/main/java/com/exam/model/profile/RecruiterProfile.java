package com.exam.model.profile;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recruiter_profile")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruiterProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String contactNumber;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
