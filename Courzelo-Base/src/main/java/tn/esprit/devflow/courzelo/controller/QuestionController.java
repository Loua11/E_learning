package tn.esprit.devflow.courzelo.controller;


import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.esprit.devflow.courzelo.entity.Question;
import tn.esprit.devflow.courzelo.entity.QuestionDTO;
import tn.esprit.devflow.courzelo.entity.Quiz;
import tn.esprit.devflow.courzelo.services.IQuestionService;
import tn.esprit.devflow.courzelo.services.IQuizService;

import java.util.*;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionController {
    @Autowired
    IQuestionService questionserv;
    @Autowired
    IQuizService quizService;


    @PostMapping("/addQuestion")
    public Question addQuestion(@RequestBody QuestionDTO questionDTO) {
        Question question = new Question();
        question.setQuestionText(questionDTO.getQuestionText());
        question.setCorrectanswer(questionDTO.getCorrectAnswer());
        question.setOptions(questionDTO.getOptions());
        return questionserv.addQuestion(question);

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
//    @PostMapping("/eval-quiz")
//    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions)
//    {   double marksGot=0;
//        int attempted=0;
//        int correctAnswers=0;
//
//        for(Question q : questions){
//            // System.out.println(q.getGivenAnswer());
//            //single questions
//            Question question=this.questionserv.get(q.getIdquestion());
//            if( question.getCorrectanswer().equals(q.getGivenAnswer()))
//            {
//                correctAnswers++;
//               //double marksSingle=Double.parseDouble(String.valueOf(questions.get(0).getQuiz().getMaxScore()))/questions.size();
//                double marksSingle=Double.parseDouble(String.valueOf(questions.get(0).getQuiz().getMaxScore()))/questions.size();
//                marksGot+=marksSingle;
//            }
//            if(q.getGivenAnswer() != null    )
//            {
//                attempted++;
//            }
//
//
//
//
//        };
//        Map<String,Object> map=Map.of("marksGot",marksGot,"correctAnswer",correctAnswers,"attepted",attempted);
//
//        return ResponseEntity.ok(map);
//
//
//
//
//
//
//    }
@PostMapping("/eval-quiz/{quizId}")
public ResponseEntity<?> evalQuiz(@PathVariable String quizId, @RequestBody List<Question> questionsWithAnswers) {
    // Retrieve the Quiz object by its ID
    Quiz quiz = quizService.retrieveQuiz(quizId);
    if (quiz == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quiz not found");
    }

    // Retrieve the list of questions associated with the quiz
    List<Question> questions = quiz.getQuestions();

    // Validate that the number of provided questions matches the number of questions in the quiz
    if (questionsWithAnswers.size() != questions.size()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Number of questions does not match");
    }

    double marksGot = 0;
    int attempted = 0;
    int correctAnswers = 0;

    // Iterate through each provided question and compare the given answer with the correct answer
    for (Question q : questionsWithAnswers) {
        // Find the corresponding question in the quiz
        Optional<Question> matchingQuestion = questions.stream()
                .filter(question -> question.getIdquestion().equals(q.getIdquestion()))
                .findFirst();

        if (matchingQuestion.isPresent()) {
            Question question = matchingQuestion.get();

            if (question.getCorrectanswer() != null && question.getCorrectanswer().equals(q.getGivenAnswer())) {
                correctAnswers++;
                marksGot += (double) quiz.getMaxScore() / questions.size();
            }

            if (q.getGivenAnswer() != null) {
                attempted++;
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Question with ID " + q.getIdquestion() + " not found in the quiz");
        }
    }

    Map<String, Object> map = Map.of("marksGot", marksGot, "correctAnswer", correctAnswers, "attempted", attempted);
    return ResponseEntity.ok(map);
}

    @GetMapping("/question/quiz/{qid}")
    public ResponseEntity<?>getQuestionOfQuizz(@PathVariable("qid")String qid)
    {

        Quiz quizz=quizService.retrieveQuiz(qid);
        List<Question> questions=  quizz.getQuestions();

        List <Question> list=new ArrayList(questions);
        if(list.size()>quizz.getQuestions().size())
        {
            list=list.subList(0,quizz.getQuestions().size()+1);
        }

        Collections.shuffle(list);
        return ResponseEntity.ok(list);


    }


}
