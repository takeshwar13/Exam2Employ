package com.exam.service;


import com.exam.model.test.Test;
import com.exam.model.test.TestResult;
import java.util.List;
import java.util.Map;

public interface TestService {

    /**
     * Creates a new test.
     * @param test The Test object to be saved.
     * @return The saved Test object.
     */
    Test createTest(Test test);

    /**
     * Assembles a randomized list of questions for a candidate starting a test.
     * This method contains the core logic for randomization.
     * @param testId The ID of the test to start.
     * @return A list of Question objects with sensitive fields (like answer) removed.
     */
    List<Map<String, Object>> startTest(Long testId);

    /**
     * Submits a test taken by a candidate and calculates the score.
     * @param testId The ID of the test being submitted.
     * @param candidateId The ID of the candidate who took the test.
     * @param answers A map where the key is the question ID and the value is the submitted answer.
     * @return The final TestResult object with the calculated score.
     */
    TestResult submitTest(Long testId, Long candidateId, Map<Long, String> answers);
}