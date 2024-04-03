package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.Question;

import java.util.List;

public interface IQuestionService {
    Question addQuestion (Question qu);
    public List<Question> retrieveAllQuestions();
    public Question updateQuestion(Question qu , String idquestion );
    public void deleteQuestion(String idquestion);
    public Question retrieveQuestion (String idquestion);
    public Question get(String questionsIde);

}
