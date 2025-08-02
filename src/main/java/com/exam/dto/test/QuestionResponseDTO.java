package com.exam.dto.test;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionResponseDTO {

    private Long id;
    private String content;
    private Integer marks;
    private String answer;

    private Long testId;
    private String testTitle;

    private List<OptionResponseDTO> options;
}
