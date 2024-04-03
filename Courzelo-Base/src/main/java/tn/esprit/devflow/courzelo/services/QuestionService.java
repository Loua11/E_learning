package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.Question;
import tn.esprit.devflow.courzelo.repository.QuestionRepository;

import java.util.List;

@Service
public class QuestionService implements IQuestionService{
@Autowired
QuestionRepository questionrepo;
    @Override
    public Question addQuestion(Question qu) {
        return questionrepo.save(qu);


    }

    @Override
    public List<Question> retrieveAllQuestions() {
        return questionrepo.findAll();
    }

    @Override
    public Question updateQuestion(Question qu, String idquestion) {
        qu.setIdquestion(idquestion);

        return questionrepo.save(qu);
    }

    @Override
    public void deleteQuestion(String idquestion) {
questionrepo.deleteById(idquestion);
    }

    @Override
    public Question retrieveQuestion(String idquestion) {
        Question q =questionrepo.findById(idquestion).get();
        return  q;

    }

    @Override
    public Question get(String questionsIde) {
        return this.questionrepo.findById(questionsIde).get();
    }
}
