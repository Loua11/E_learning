package tn.esprit.devflow.courzelo.controller;

import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.Quiz;
import tn.esprit.devflow.courzelo.repository.QuizRepository;
import tn.esprit.devflow.courzelo.services.IQuizService;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class QuizController {
    @Autowired
    IQuizService quizserv;

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
    public ResponseEntity<Quiz> addQuizWithQuestions(@RequestBody Quiz quiz) {
        Quiz addedQuiz = quizserv.addQuizWithQuestions(quiz);
        if (addedQuiz != null) {
            return ResponseEntity.ok(addedQuiz);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }



}
