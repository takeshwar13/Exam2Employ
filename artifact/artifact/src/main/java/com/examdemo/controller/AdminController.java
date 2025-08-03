package com.examdemo.controller;

import com.examdemo.dto.ExamRequestDTO;
import com.examdemo.dto.QuestionDTO;
import com.examdemo.dto.AdminDTO;
import com.examdemo.service.AdminService;
import com.examdemo.mapper.AdminMapper;
import com.examdemo.model.profiles.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
//@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/approve-recruiter/{id}")
    public ResponseEntity<String> approveRecruiter(@PathVariable Long id) {
        adminService.approveRecruiter(id);
        return ResponseEntity.ok("Recruiter approved successfully");
    }

    @PostMapping("/add-question")
    public ResponseEntity<String> addQuestion(@RequestBody QuestionDTO questionDTO) {
        adminService.addQuestion(questionDTO);
        return ResponseEntity.ok("Question added to database");
    }

    @PostMapping("/create-exam")
    public ResponseEntity<String> createExam(@RequestBody ExamRequestDTO dto) {
        adminService.createExam(dto);
        return ResponseEntity.ok("Exam created based on recruiter request");
    }

//    @PostMapping("/add-admin")
//    public ResponseEntity<String> addAdmin(@RequestBody AdminDTO adminDTO) {
//        Admin admin = AdminMapper.toEntity(adminDTO);
//        adminService.addAdmin(admin);
//        return ResponseEntity.ok("New admin registered");
//    }
    
    @PostMapping("/add-admin")
    public ResponseEntity<String> addAdmin(@RequestBody AdminDTO adminDTO) {
    	System.out.println("i am here ");
        adminService.addAdmin(adminDTO);
        return ResponseEntity.ok("New admin registered");
    }

}
