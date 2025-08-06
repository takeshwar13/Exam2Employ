package com.examserver2.service.test;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examserver2.dto.QuestionRequestDTO;
import com.examserver2.dto.QuestionResponseDTO;
import com.examserver2.dto.QuestionResponseDTO2;
import com.examserver2.dto.SubmitTestDTO;
import com.examserver2.dto.TestDTO;
import com.examserver2.dto.TestDetailsDTO;
import com.examserver2.dto.TestResultDTO;
import com.examserver2.entities.Question;
import com.examserver2.entities.Test;
import com.examserver2.entities.TestResult;
import com.examserver2.entities.User;
import com.examserver2.mapper.QuestionMapper;
import com.examserver2.mapper.TestMapper;
import com.examserver2.mapper.TestResultMapper;
import com.examserver2.repository.QuestionRepository;
import com.examserver2.repository.TestRepository;
import com.examserver2.repository.TestResultRepository;
import com.examserver2.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepository;
   
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private TestResultRepository testResultRepository; 
    
    @Autowired
    private UserRepository userRepository; 
    @Override
    public TestDTO createTest(TestDTO dto) {

        Test test = TestMapper.toEntity(dto);
        Test savedTest = testRepository.save(test);
        return TestMapper.toDTO(savedTest);
    }
    
    @Override
    public QuestionResponseDTO addQuestionInTest(QuestionRequestDTO dto) {
        Test test = testRepository.findById(dto.getTestId())
                .orElseThrow(() -> new EntityNotFoundException("Test Not Found"));

        Question question = QuestionMapper.toEntity(dto);
        question.setTest(test);  // associate with Test

        Question saved = questionRepository.save(question);
        return QuestionMapper.toResponseDTO(saved); // respond with client-facing DTO
    }
    
    public List<TestDTO> getAllTests() {
        return testRepository.findAll().stream()
            .map(TestMapper::toDTO)
            .collect(Collectors.toList());
    }
    
    //v-28
    public TestDetailsDTO getAllQuestionsByTest(Long id) {
        Optional<Test> optionalTest = testRepository.findById(id);
        TestDetailsDTO testDetailsDTO = new TestDetailsDTO();
        
        if (optionalTest.isPresent()) {
//          TestDTO testDTO = optionalTest.get().getDto();
            Test test = optionalTest.get();
            TestDTO testDTO = TestMapper.toDTO(test);
            
//           // Multiply time per question by number of questions
//            testDTO.setTime(optionalTest.get().getTime() * optionalTest.get().getQuestions().size());
            testDTO.setTime(test.getTime() * test.getQuestions().size());
            
            // Populate questions list with mapped DTOs
            testDetailsDTO.setTestDTO(testDTO);
            testDetailsDTO.setQuestions(
                    test.getQuestions().stream()
                            .map(QuestionMapper::toResponseDTO) //changed from question::getDto 
                            .toList()
            );
            
            return testDetailsDTO;
        }
         
        return testDetailsDTO; // Returns empty DTO if test not found
    }

    //v-33 complecated
    public TestResultDTO submitTest(SubmitTestDTO request) {
 
        Test test = testRepository.findById(request.getTestId())
            .orElseThrow(() -> new EntityNotFoundException("Test not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        
        int correctAnswers = 0;
        
        for (QuestionResponseDTO2 response : request.getResponses()) {
            Question question = questionRepository.findById(response.getQuestionId())
                .orElseThrow(() -> new EntityNotFoundException("Question not found"));

            if (question.getCorrectOption().equals(response.getSelectedOption())) {
                correctAnswers++;
            }
        }
        
        int totalQuestions = test.getQuestions().size();
        double percentage = (double) correctAnswers / totalQuestions * 100;
        
        TestResult testResult = new TestResult();
        testResult.setTest(test);
        testResult.setUser(user);
        testResult.setTotalQuestions(totalQuestions);
        testResult.setCorrectAnswers(correctAnswers);
        testResult.setPercentage(percentage);

        testResultRepository.save(testResult);
        
        return TestResultMapper.toDto(testResult);
           
    }
    
    public List<TestResultDTO> getAllTestResults(){
        return testResultRepository.findAll().stream().map(TestResultMapper::toDto).collect(Collectors.toList());
    }
    
    public List<TestResultDTO> getAllTestResultsOfUser(Long userId){
        return testResultRepository.findAllByUserId(userId).stream().map(TestResultMapper::toDto).collect(Collectors.toList());
    }
    
}

