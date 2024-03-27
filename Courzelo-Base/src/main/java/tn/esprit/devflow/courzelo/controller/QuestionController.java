package tn.esprit.devflow.courzelo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.devflow.courzelo.entity.Event;
import tn.esprit.devflow.courzelo.entity.Question;
import tn.esprit.devflow.courzelo.services.IQuestionService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionController {
    @Autowired
    IQuestionService questionserv;

    @PostMapping("/addQuestion")
    public Question addQuestion(@RequestBody Question qu) {
        return questionserv.addQuestion(qu);
    }

    @GetMapping("/retrievequestions")
    @ResponseBody
    public List<Question> getQuestions() {

        List<Question> listquestions= questionserv.retrieveAllQuestions();

        return listquestions ;

    }

    @PutMapping("/updateQuestion/{idquestion}")
    @ResponseBody
    public Question modifyQuestion(@RequestBody Question qu, @PathVariable String idquestion) {
        return questionserv.updateQuestion(qu, idquestion);
    }

    @DeleteMapping("/DeleteQuestion/{idquestion}")
    @ResponseBody
    public void deleteQuestion(@PathVariable String idquestion) {
        questionserv.deleteQuestion(idquestion);




    }

    @GetMapping("/retrieveQuestion/{idquestion}")
    @ResponseBody

    public Question retrieveQuestion (@PathVariable String idquestion) {
        return questionserv.retrieveQuestion(idquestion);

    }


}
