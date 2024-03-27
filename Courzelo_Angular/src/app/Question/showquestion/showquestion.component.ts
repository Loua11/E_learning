import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/Service/Evaluation/question.service';

@Component({
  selector: 'app-showquestion',
  templateUrl: './showquestion.component.html',
  styleUrls: ['./showquestion.component.css']
})
export class ShowquestionComponent {
  questionDetails: any;

  constructor(private questionService:   QuestionService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idquestion = params.get('id');
      if (idquestion !== null) {
        this.questionService.retrieveQuestion(idquestion).subscribe(
          (questionDetails: any) => {
            this.questionDetails = questionDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
