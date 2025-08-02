package com.exam.dto.test;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionRequestDTO {

    @NotBlank(message = "Question content cannot be blank")
    @Size(max = 5000, message = "Content must be within 5000 characters")
    private String content;

    @Min(value = 0, message = "Marks must be 0 or more")
    private Integer marks;

    @Min(value = 1, message = "testId must be a valid positive ID")
    private Long testId;

    @Size(min = 2, message = "At least 2 options required")
    @Valid
    private List<OptionRequestDTO> options;
}
