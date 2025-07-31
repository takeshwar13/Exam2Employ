package com.exam.service.impl;

import com.exam.model.job.TestRequest;
import com.exam.model.job.TestRequest.RequestStatus;
import com.exam.repo.test.TestRequestRepository;
import com.exam.service.TestRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TestRequestServiceImpl implements TestRequestService {

    @Autowired
    private TestRequestRepository testRequestRepository;

    @Override
    public TestRequest createTestRequest(TestRequest testRequest) {
        testRequest.setStatus(RequestStatus.PENDING);
        testRequest.setRequestDate(LocalDateTime.now());
        return this.testRequestRepository.save(testRequest);
    }

    @Override
    public List<TestRequest> getPendingRequests() {
        return this.testRequestRepository.findByStatus(RequestStatus.PENDING);
    }

    @Override
    public TestRequest approveRequest(Long requestId) {
        TestRequest request = testRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("TestRequest not found with id: " + requestId));
        
        request.setStatus(RequestStatus.APPROVED);
        return testRequestRepository.save(request);
    }

    @Override
    public TestRequest rejectRequest(Long requestId, String adminNotes) {
        TestRequest request = testRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("TestRequest not found with id: " + requestId));
        
        request.setStatus(RequestStatus.REJECTED);
        request.setAdminNotes(adminNotes);
        return testRequestRepository.save(request);
    }
}