package tn.esprit.devflow.courzelo.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Question;
import tn.esprit.devflow.courzelo.entity.Quiz;
import tn.esprit.devflow.courzelo.repository.QuestionRepository;
import tn.esprit.devflow.courzelo.repository.QuizRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService implements IQuizService {
    @Autowired
    QuizRepository quizrepo;
    @Autowired
    QuestionRepository questionrepo;

    @Override
    public Quiz addQuiz(Quiz q) {
        return quizrepo.save(q);
    }

    @Override
    public List<Quiz> retrieveAllQuizzes() {
        List<Quiz> quizzes = quizrepo.findAll();
        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(quizzes);
            System.out.println(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            // Vous pouvez également logger l'erreur ou faire d'autres traitements ici
        }
        return quizzes;
    }


    @Override
    public Quiz updateQuiz(Quiz q, String idquiz) {
        q.setIdquiz(idquiz);
        return quizrepo.save(q);
    }

    @Override
    public void deleteQuiz(String idquiz) {
        quizrepo.deleteById(idquiz);
    }

    @Override
    public Quiz retrieveQuiz(String idquiz) {
        return quizrepo.findById(idquiz).get();
    }


    public Quiz addQuizWithQuestions(Quiz quiz) {
        // Vérifiez et enregistrez les questions si elles sont nouvelles
        List<Question> savedQuestions = quiz.getQuestions().stream()
                .map(question -> {
                    if (question.getIdquestion() == null) { // Assurez-vous que getId est le bon appel pour obtenir l'identifiant de la question
                        return questionrepo.save(question);
                    }
                    return question;
                })
                .collect(Collectors.toList());

        // Affectez les questions sauvegardées au quiz
        quiz.setQuestions(savedQuestions);

        // Sauvegardez le quiz avec les questions
        return quizrepo.save(quiz);
    }

}
