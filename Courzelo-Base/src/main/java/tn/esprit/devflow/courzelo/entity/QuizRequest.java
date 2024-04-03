package tn.esprit.devflow.courzelo.entity;

import lombok.Data;

import java.util.List;
@Data

public class QuizRequest {
    private String description;
    private int duration;
    private int maxScore;
    private List<String> questions;
}
