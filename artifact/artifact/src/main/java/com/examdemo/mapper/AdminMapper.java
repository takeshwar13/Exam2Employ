package com.examdemo.mapper;

import com.examdemo.dto.AdminDTO;
import com.examdemo.model.profiles.Admin;

public class AdminMapper {

    public static AdminDTO toDTO(Admin admin) {
        if (admin == null) return null;

        AdminDTO dto = new AdminDTO();
        dto.setName(admin.getName());
        dto.setEmail(admin.getEmail());
        return dto;
    }

    public static Admin toEntity(AdminDTO dto) {
        if (dto == null) return null;

        Admin admin = new Admin();
        admin.setName(dto.getName());
        admin.setEmail(dto.getEmail());
        return admin;
    }
}

