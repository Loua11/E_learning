import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/Service/Evaluation/quiz.service';

@Component({
  selector: 'app-showquiz',
  templateUrl: './showquiz.component.html',
  styleUrls: ['./showquiz.component.css']
})
export class ShowquizComponent {
  quizDetails: any;

  constructor(private quizService: QuizService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idquiz = params.get('id');
      if (idquiz !== null) {
        this.quizService.retrieveQuiz(idquiz).subscribe(
          (quizDetails: any) => {
            this.quizDetails = quizDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
