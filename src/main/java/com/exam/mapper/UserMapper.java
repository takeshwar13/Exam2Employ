package com.exam.mapper;

//import com.exam.dto.profile.AdminProfileDTO;
//import com.exam.dto.profile.CandidateProfileDTO;
//import com.exam.dto.profile.RecruiterProfileDTO;
import com.exam.dto.profile.UserDTO;
import com.exam.model.profile.User;
import com.exam.dto.profile.AdminProfileDTO;
import com.exam.dto.profile.CandidateProfileDTO;
import com.exam.dto.profile.RecruiterProfileDTO;


public class UserMapper {

    /**
     * Converts a User entity to a UserDTO.
     * @param user The User entity to convert.
     * @return The converted UserDTO.
     */
    public static UserDTO toUserDTO(User user) {
        if (user == null) {
            return null;
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setPassword(user.getPassword());
        userDTO.setRole(user.getRole());
        userDTO.setApproved(user.isApproved());

//         Map profile DTOs if the profiles exist
        if (user.getRecruiterProfile() != null) {
            RecruiterProfileDTO recruiterProfileDTO = new RecruiterProfileDTO();
            recruiterProfileDTO.setId(user.getRecruiterProfile().getId());
            userDTO.setRecruiterProfile(recruiterProfileDTO);
        }

        if (user.getAdminProfile() != null) {
            AdminProfileDTO adminProfileDTO = new AdminProfileDTO();
            adminProfileDTO.setId(user.getAdminProfile().getId());
            userDTO.setAdminProfile(adminProfileDTO);
        }

        if (user.getCandidateProfile() != null) {
            CandidateProfileDTO candidateProfileDTO = new CandidateProfileDTO();
            candidateProfileDTO.setId(user.getCandidateProfile().getId());
            userDTO.setCandidateProfile(candidateProfileDTO);
        }

        return userDTO;
    }

    /**
     * Converts a UserDTO to a User entity.
     * @param userDTO The UserDTO to convert.
     * @return The converted User entity.
     */
    public static User toUser(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }

        User user = new User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getRole());
        user.setApproved(userDTO.isApproved());

        // Note: Profiles are not mapped back from DTO to entity in a simple mapper.
        // This is typically handled by the service layer's business logic.
        return user;
    }
}
