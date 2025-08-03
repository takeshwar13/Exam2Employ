package com.examdemo.service;

import java.util.List;

import com.examdemo.dto.ExamRequestDTO;
import com.examdemo.dto.QuestionDTO;
import com.examdemo.dto.AdminDTO;
import com.examdemo.model.test.Exam;

public interface AdminService {

    void approveRecruiter(Long recruiterId);
    void addQuestion(QuestionDTO questionDTO);
    void createExam(ExamRequestDTO examRequestDTO);
    void addAdmin(AdminDTO adminDTO);
    List<Exam> getAllExams();
}
