package com.exam.service.impl;


import com.exam.model.profile.CandidateProfile;
import com.exam.model.test.Question;
import com.exam.model.test.Test;
import com.exam.model.test.TestConfiguration;
import com.exam.model.test.TestResult;
import com.exam.repo.user.CandidateProfileRepository;
import com.exam.repo.test.QuestionRepository;
import com.exam.repo.test.TestRepository;
import com.exam.repo.test.TestResultRepository;
import com.exam.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private CandidateProfileRepository candidateProfileRepository;

    @Override
    public Test createTest(Test test) {
        // When creating a test, its configurations should be saved along with it.
        // The CascadeType.ALL on the Test entity handles this.
        return this.testRepository.save(test);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map<String, Object>> startTest(Long testId) {
        Test test = this.testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found with id: " + testId));

        List<Question> randomizedQuestions = new ArrayList<>();
        for (TestConfiguration config : test.getConfigurations()) {
            List<Question> questionsFromCategory = this.questionRepository.findRandomQuestionsByCategory(
                    config.getCategory().getId(),
                    config.getNumberOfQuestions()
            );
            randomizedQuestions.addAll(questionsFromCategory);
        }

        // We should not send the correct answers to the frontend.
        // We create a list of maps, returning only the data the candidate needs.
        return randomizedQuestions.stream().map(q -> {
            Map<String, Object> questionMap = new HashMap<>();
            questionMap.put("id", q.getId());
            questionMap.put("content", q.getContent());
            questionMap.put("options", q.getOptions());
            questionMap.put("marks", q.getMarks());
            return questionMap;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public TestResult submitTest(Long testId, Long candidateId, Map<Long, String> answers) {
        Test test = this.testRepository.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test not found with id: " + testId));
        CandidateProfile candidate = this.candidateProfileRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found with id: " + candidateId));

        int totalScore = 0;
        List<Long> questionIds = new ArrayList<>(answers.keySet());
        List<Question> questions = this.questionRepository.findAllById(questionIds);

        // Convert list to map for easy lookup
        Map<Long, Question> questionMap = questions.stream()
                .collect(Collectors.toMap(Question::getId, q -> q));

        for (Map.Entry<Long, String> entry : answers.entrySet()) {
            Long questionId = entry.getKey();
            String submittedAnswer = entry.getValue();
            Question question = questionMap.get(questionId);

            if (question != null && question.getAnswer().equals(submittedAnswer)) {
                totalScore += question.getMarks();
            }
        }

        TestResult testResult = new TestResult();
        testResult.setTest(test);
        testResult.setCandidate(candidate);
        testResult.setScore(totalScore);
        testResult.setCompletedAt(LocalDateTime.now());

        return this.testResultRepository.save(testResult);
    }
}