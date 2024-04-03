import {Component, OnInit} from '@angular/core';

import {LocationStrategy} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../Service/Evaluation/question.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-startquiz',
  templateUrl: './startquiz.component.html',
  styleUrls: ['./startquiz.component.css']
})
export class StartquizComponent implements OnInit {
  qid:any;
  questions:any;
  marksGot=0;
  attempted=0;
  correctAnswers=0;
  isSubmit=false;
  timer:any;


  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    this.loadQuestions();
  }
  constructor(private locationStrategy:LocationStrategy,
              private _route:ActivatedRoute,
              private questionService:QuestionService) {
  }
  preventBackButton()
  {
    history.pushState(null,'',location.href);
    this.locationStrategy.onPopState(()=>{
      history.pushState(null,'',location.href);
    });


  }

  private loadQuestions() {
    this.questionService.getQuestionsOfQuiz(this.qid).subscribe((data)=>{

      this.questions=data;
      console.log("data of the quizz work",this.questions);
      this.timer=this.questions.length  * 60;

      this.questions.forEach((q:any) =>{
        q['givenAnswer']='';


      });
      console.log(this.questions);
      this.startTimer();

    },error => {
      console.log(error);
      Swal.fire("Error !!","Error in loading questions of quiz",'error');


    });

  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',

      showCancelButton: true,
      confirmButtonText: 'Submit',

      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed)
      {this.evalQuiz();
      }
    })
  }
  startTimer()
  {
    let t=window.setInterval(()=>{
      //code
      if(this.timer <= 0)
      {
        this.evalQuiz();
        clearInterval(t);
      }
      else {
        this.timer--;
      }
    },1000);
  }
  getFormattedTme()
  {
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }

  private evalQuiz() {
    const questionsWithAnswers = this.questions.map((question: any) => {
      return {
        idquestion: question.idquestion,
        givenAnswer: question.givenAnswer
      };
    });
    this.questionService.evalQuiz(this.qid,questionsWithAnswers).subscribe((data:any)=>{
      console.log(data);
      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers=data.correctAnswer;
      this.attempted=data.attempted;
      this.isSubmit=true;


    },error => {
      console.log(error);

    });

  }

  printPage() {
    window.print();

  }

}
