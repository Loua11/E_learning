package tn.esprit.devflow.courzelo.controller;

import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.Question;
import tn.esprit.devflow.courzelo.entity.Quiz;
import tn.esprit.devflow.courzelo.entity.QuizRequest;
import tn.esprit.devflow.courzelo.repository.QuestionRepository;
import tn.esprit.devflow.courzelo.services.IQuizService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class QuizController {
    @Autowired
    IQuizService quizserv;
    @Autowired
    QuestionRepository questionRepository;

    @PostMapping("/addQuiz")
    public Quiz addQuiz(@RequestBody Quiz q) {
        return quizserv.addQuiz(q);
    }

    @GetMapping("/retrieveallquizzes")
    @ResponseBody
    public List<Quiz> getQuizzes() {

        List<Quiz> listQuizzes= quizserv.retrieveAllQuizzes();

        return listQuizzes ;

    }

    @PutMapping("/updateQuiz/{idquiz}")
    @ResponseBody
    public Quiz modifyQuiz(@RequestBody Quiz q, @PathVariable String idquiz ) {

        return quizserv.updateQuiz(q,idquiz);


    }

    @DeleteMapping("/deleteQuiz/{idquiz}")
    @ResponseBody
    public void deleteQuiz(@PathVariable String idquiz) {
        quizserv.deleteQuiz(idquiz);




    }

    @GetMapping("/retrieveQuiz/{idquiz}")
    @ResponseBody

    public Quiz retrieveQuiz (@PathVariable String idquiz) {
        return quizserv.retrieveQuiz(idquiz);

    }

    @PostMapping("/add")
    public ResponseEntity<Quiz> addQuizWithQuestions(@RequestBody QuizRequest quizRequest) {
        List<String> questionIds = quizRequest.getQuestions();
        List<Question> questions = new ArrayList<>();
        boolean allQuestionsExist = true;
        for (String questionId : questionIds) {
            Optional<Question> questionOptional = questionRepository.findById(questionId);
            if (questionOptional.isEmpty()) {
                allQuestionsExist = false;
                break;
            }

            questions.add(questionOptional.get());



        }
        if (allQuestionsExist) {
            Quiz quiz =new Quiz();
            quiz.setDescription(quizRequest.getDescription());
            quiz.setDuration(quizRequest.getDuration());
            quiz.setMaxScore(quizRequest.getMaxScore());



            quiz.setQuestions(questions);
            Quiz addedQuiz = quizserv.addQuizWithQuestions(quiz);
            return ResponseEntity.ok(addedQuiz);

        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        }

    }



}
