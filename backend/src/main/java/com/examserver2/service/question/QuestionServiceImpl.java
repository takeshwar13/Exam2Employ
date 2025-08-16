package com.examserver2.service.question;

//import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examserver2.dto.QuestionRequestDTO;
import com.examserver2.dto.QuestionResponseDTO;
import com.examserver2.dto.TestDTO;
import com.examserver2.dto.TestDetailsDTO;
import com.examserver2.entities.Question;
import com.examserver2.entities.Test;
import com.examserver2.mapper.QuestionMapper;
import com.examserver2.mapper.TestMapper;
import com.examserver2.repository.QuestionRepository;
import com.examserver2.repository.TestRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TestRepository testRepository;
    
    @Override
    public QuestionResponseDTO addQuestionInTest(QuestionRequestDTO dto) {
        Test test = testRepository.findById(dto.getTestId())
                .orElseThrow(() -> new EntityNotFoundException("Test Not Found"));

        Question question = QuestionMapper.toEntity(dto);
        question.setTest(test);  // associate with Test

        Question saved = questionRepository.save(question);
        return QuestionMapper.toResponseDTO(saved); // respond with client-facing DTO
    }
    
    //v-28
//    public TestDetailsDTO getAllQuestionsByTest(Long id) {
//        Optional<Test> optionalTest = testRepository.findById(id);
//        TestDetailsDTO testDetailsDTO = new TestDetailsDTO();
//        
//        if (optionalTest.isPresent()) {
////          TestDTO testDTO = optionalTest.get().getDto();
//            Test test = optionalTest.get();
//            TestDTO testDTO = TestMapper.toDTO(test);
//            
////           // Multiply time per question by number of questions
////            testDTO.setTime(optionalTest.get().getTime() * optionalTest.get().getQuestions().size());
//            testDTO.setTime(test.getTime() * test.getQuestions().size());
//            
//            // Populate questions list with mapped DTOs
//            testDetailsDTO.setTestDTO(testDTO);
//            testDetailsDTO.setQuestions(
//                    test.getQuestions().stream()
//                            .map(QuestionMapper::toResponseDTO) //changed from question::getDto 
//                            .toList()
//            );
//            
//            return testDetailsDTO;
//        }
//         
//        return testDetailsDTO; // Returns empty DTO if test not found
//    }

    @Override
    public TestDetailsDTO getAllQuestionsByTest(Long id) {
        Test test = testRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Test not found with id: " + id));

        TestDetailsDTO testDetailsDTO = new TestDetailsDTO();

        TestDTO testDTO = TestMapper.toDTO(test);
        testDetailsDTO.setTestDTO(testDTO);

        testDetailsDTO.setQuestions(
            test.getQuestions().stream()
                .map(QuestionMapper::toResponseDTO)
                .collect(Collectors.toList())
        );

        return testDetailsDTO;
    }

    @Override
    public QuestionResponseDTO updateQuestion(Long questionId, QuestionRequestDTO dto) {
        // Fetch existing question
        Question existingQuestion = questionRepository.findById(questionId)
            .orElseThrow(() -> new EntityNotFoundException("Question not found"));

        // Update fields using mapper
        QuestionMapper.updateEntityFromDTO(existingQuestion, dto);

        // Update test association if testId is provided and different
        if (dto.getTestId() != null && !dto.getTestId().equals(existingQuestion.getTest().getId())) {
            Test test = testRepository.findById(dto.getTestId())
                .orElseThrow(() -> new EntityNotFoundException("Test not found"));
            existingQuestion.setTest(test);
        }

        // Save and return updated DTO
        Question updated = questionRepository.save(existingQuestion);
        return QuestionMapper.toResponseDTO(updated);
    }

    @Override
    public void deleteQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId)
        .orElseThrow(() -> new EntityNotFoundException("Question not found"));
        questionRepository.delete(question);
    }
    
    


}

