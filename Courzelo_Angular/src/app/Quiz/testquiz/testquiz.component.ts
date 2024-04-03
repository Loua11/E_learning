import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../Service/Evaluation/quiz.service";

@Component({
  selector: 'app-testquiz',
  templateUrl: './testquiz.component.html',
  styleUrls: ['./testquiz.component.css']
})
export class TestquizComponent implements OnInit{
  quizzes:any;
  constructor(private quizService:QuizService) {

  }
  ngOnInit(): void {
    this.quizService.getAll().subscribe((res)=>{
      console.log(res)
      this.quizzes=res;

    },error => {
      console.log(error)
    })
  }

  onClickQuiz(id:any) {

  }
}
