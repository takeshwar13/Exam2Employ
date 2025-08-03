package com.examdemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examdemo.model.profiles.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    // You can extend with custom queries if needed
}

