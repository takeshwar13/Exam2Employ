package com.examdemo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examdemo.model.test.Exam;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByRequestedBy_Id(Long recruiterId);
    List<Exam> findByCreatedBy_Id(Long adminId);
}
