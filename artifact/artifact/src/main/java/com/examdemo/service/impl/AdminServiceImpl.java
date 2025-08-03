package com.examdemo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examdemo.dto.ExamRequestDTO;
import com.examdemo.dto.QuestionDTO;
import com.examdemo.dto.AdminDTO;
import com.examdemo.mapper.AdminMapper;
import com.examdemo.model.profiles.Admin;
import com.examdemo.model.profiles.Recruiter;
import com.examdemo.model.test.Exam;
import com.examdemo.model.test.Question;
import com.examdemo.repository.AdminRepository;
import com.examdemo.repository.ExamRepository;
import com.examdemo.repository.QuestionRepository;
import com.examdemo.repository.RecruiterRepository;
import com.examdemo.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private RecruiterRepository recruiterRepo;

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private ExamRepository examRepo;

    @Autowired
    private AdminRepository adminRepo;

    @Override
    public void approveRecruiter(Long recruiterId) {
        Recruiter recruiter = recruiterRepo.findById(recruiterId)
            .orElseThrow(() -> new RuntimeException("Recruiter not found"));
        recruiter.setApproved(true);
        recruiterRepo.save(recruiter);
    }

    @Override
    public void addQuestion(QuestionDTO questionDTO) {
        Question question = new Question();
        question.setContent(questionDTO.getContent());
        question.setDifficultyLevel(questionDTO.getDifficultyLevel());
        question.setOptionA(questionDTO.getOptionA());
        question.setOptionB(questionDTO.getOptionB());
        question.setOptionC(questionDTO.getOptionC());
        question.setOptionD(questionDTO.getOptionD());
        question.setCorrectAnswer(questionDTO.getCorrectAnswer());
        question.setTopic(questionDTO.getTopic());
        questionRepo.save(question);
    }

    @Override
    public void createExam(ExamRequestDTO examRequestDTO) {
        Recruiter recruiter = recruiterRepo.findById(examRequestDTO.getRecruiterId())
            .orElseThrow(() -> new RuntimeException("Recruiter not found"));

        Exam exam = new Exam();
        exam.setTitle(examRequestDTO.getTitle());
        exam.setQuestionCount(examRequestDTO.getQuestionCount());
        exam.setDate(examRequestDTO.getDate());
        exam.setDurationMinutes(examRequestDTO.getDurationMinutes());
        exam.setRequestedBy(recruiter);
        // Optionally set createdBy if admin context is available
        examRepo.save(exam);
    }

    @Override
    public void addAdmin(AdminDTO adminDTO) {
        Admin admin = AdminMapper.toEntity(adminDTO);
        adminRepo.save(admin);
    }

    @Override
    public List<Exam> getAllExams() {
        return examRepo.findAll();
    }
}
