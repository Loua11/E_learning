package tn.esprit.devflow.courzelo.entity;

import lombok.Data;

import java.util.List;
@Data

public class QuestionDTO {
    private String questionText;
    private String correctAnswer;
    private List<String> options;
}
