package com.examserver2.dto;

import java.util.List;

import lombok.Data;

@Data
public class SubmitTestDTO {
	private Long testId;
	private Long userId;
	private List<QuestionResponseDTO2> responses;
	private int timeSpentSeconds;
}
