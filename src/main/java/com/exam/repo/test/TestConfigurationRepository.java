package com.exam.repo.test;


import com.exam.model.test.TestConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestConfigurationRepository extends JpaRepository<TestConfiguration, Long> {
}