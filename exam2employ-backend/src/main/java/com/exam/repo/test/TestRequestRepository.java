package com.exam.repo.test;

import com.exam.model.job.TestRequest;
import com.exam.model.job.TestRequest.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRequestRepository extends JpaRepository<TestRequest, Long> {

    /**
     * Finds all test requests with a specific status.
     * @param status The status to filter by (e.g., PENDING).
     * @return A list of test requests.
     */
    List<TestRequest> findByStatus(RequestStatus status);
}