package com.examdemo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examdemo.model.test.Result;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByCandidateEmail(String email);
    List<Result> findByExam_Id(Long examId);
}
