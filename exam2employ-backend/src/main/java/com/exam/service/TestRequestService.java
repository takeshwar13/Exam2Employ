package com.exam.service;

import com.exam.model.job.TestRequest;
import java.util.List;

public interface TestRequestService {

    /**
     * Creates a new test request submitted by a recruiter.
     * @param testRequest The request object.
     * @return The saved TestRequest.
     */
    TestRequest createTestRequest(TestRequest testRequest);

    /**
     * Retrieves all test requests that are pending approval.
     * @return A list of pending TestRequest objects.
     */
    List<TestRequest> getPendingRequests();

    /**
     * Approves a test request.
     * @param requestId The ID of the request to approve.
     * @return The updated TestRequest.
     */
    TestRequest approveRequest(Long requestId);

    /**
     * Rejects a test request.
     * @param requestId The ID of the request to reject.
     * @param adminNotes Notes from the admin explaining the rejection.
     * @return The updated TestRequest.
     */
    TestRequest rejectRequest(Long requestId, String adminNotes);
}