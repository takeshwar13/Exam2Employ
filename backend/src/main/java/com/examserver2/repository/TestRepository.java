package com.examserver2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examserver2.entities.Test;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {

}
