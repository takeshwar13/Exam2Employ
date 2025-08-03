package com.exam.dto.profile;

import java.util.Date;

import com.exam.model.auth.Role;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class AdminProfileDTO {
    private Long id;
    private Date createdAt;
}
