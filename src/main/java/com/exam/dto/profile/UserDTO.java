package com.exam.dto.profile;

import com.exam.model.auth.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private Long id; // Usually read-only, isliye validation nahi chahiye

    @NotBlank(message = "Username blank nahi hona chahiye")
    private String username;

    @NotBlank(message = "Password blank nahi hona chahiye")
    private String password;

    @NotNull(message = "Role null nahi hona chahiye")
    private Role role;  // ADMIN, RECRUITER, CANDIDATE

    private boolean isApproved;

    private RecruiterProfileDTO recruiterProfile;
    private CandidateProfileDTO candidateProfile;
    private AdminProfileDTO adminProfile;
}
