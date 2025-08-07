package com.examserver2.service.test;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examserver2.dto.QuestionResponseDTO2;
import com.examserver2.dto.SubmitTestDTO;
import com.examserver2.dto.TestDTO;
import com.examserver2.dto.TestResultDTO;
import com.examserver2.entities.Question;
import com.examserver2.entities.Test;
import com.examserver2.entities.TestResult;
import com.examserver2.entities.User;
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
    
    public List<TestDTO> getAllTests() {
        return testRepository.findAll().stream()
            .map(TestMapper::toDTO)
            .collect(Collectors.toList());
    }

    @Override
    public TestDTO updateTest(Long id, TestDTO dto) {
        Test existingTest = testRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Test not found with id: " + id));

        // Use mapper for clean field updates
        TestMapper.updateEntityFromDTO(existingTest, dto);

        Test updatedTest = testRepository.save(existingTest);
        return TestMapper.toDTO(updatedTest);
    }

    @Override
    public void deleteTest(Long id) {
        Test test = testRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Test not found with id: " + id));
        testRepository.delete(test);
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
        
//        System.out.println(test.getId() +" "+ user.getId());  
        
        
        testResult.setTest(test); 
        testResult.setUser(user);	
        testResult.setTotalQuestions(totalQuestions);
        testResult.setCorrectAnswers(correctAnswers);
        testResult.setPercentage(percentage);
        
        testResultRepository.save(testResult);
        System.out.println(testResult.getTest().getId());
        
        
        return TestResultMapper.toDto(testResult);
           
    }
    
    public List<TestResultDTO> getAllTestResults(){
        return testResultRepository.findAll().stream().map(TestResultMapper::toDto).collect(Collectors.toList());
    }
    
    public List<TestResultDTO> getAllTestResultsOfUser(Long userId){
        return testResultRepository.findAllByUserId(userId).stream().map(TestResultMapper::toDto).collect(Collectors.toList());
    }
    
    


}

