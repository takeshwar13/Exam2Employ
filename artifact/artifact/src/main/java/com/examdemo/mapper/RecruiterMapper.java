package com.examdemo.mapper;

import com.examdemo.dto.RecruiterDTO;
import com.examdemo.model.profiles.Recruiter;

public class RecruiterMapper {
    public static Recruiter toEntity(RecruiterDTO dto) {
        Recruiter r = new Recruiter();
        r.setName(dto.getName());
        r.setEmail(dto.getEmail());
        return r;
    }

    public static RecruiterDTO toDTO(Recruiter entity) {
        RecruiterDTO dto = new RecruiterDTO();
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        return dto;
    }
}
