package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.Quiz;

import java.util.List;

public interface IQuizService {
    Quiz addQuiz (Quiz q);
    public List<Quiz> retrieveAllQuizzes();
    public Quiz updateQuiz(Quiz q, String idquiz );
    public void deleteQuiz(String idquiz);
    public Quiz retrieveQuiz (String idquiz);
    Quiz addQuizWithQuestions(Quiz quiz);
}
