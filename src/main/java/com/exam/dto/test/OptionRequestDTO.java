package com.exam.dto.test;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OptionRequestDTO {
    
    @NotBlank(message = "Option content cannot be blank")
    private String content;

    private boolean isCorrect; // yeh extra logical field hai jo correct answer track karega
}
