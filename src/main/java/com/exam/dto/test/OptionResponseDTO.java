package com.exam.dto.test;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OptionResponseDTO {

    private Long id;
    private String content;
    private boolean isCorrect;
}
