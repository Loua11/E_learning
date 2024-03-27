import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/Service/Evaluation/quiz.service';
import { Quiz } from 'src/app/models/Evaluation/quiz';

@Component({
  selector: 'app-updatequiz',
  templateUrl: './updatequiz.component.html',
  styleUrls: ['./updatequiz.component.css']
})
export class UpdatequizComponent {


  updateForm: FormGroup;
  updatedQuiz: Quiz = { description: '', duration: 0, maxScore: 0 };

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      description: ['', Validators.required],
      duration: [0, Validators.required],
      maxScore: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const quizId = params.get('id');
      if (quizId !== null) {
        this.quizService.retrieveQuiz(quizId).subscribe(
          (quizDetails: Quiz) => {
            this.updatedQuiz = quizDetails;
            this.updateForm.patchValue(quizDetails); // Populate the form with quiz details
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
  isFieldInvalid(field: string) {
    const control = this.updateForm.get(field);
    return control && control.touched && control.invalid;
  }

  updateQuiz() {
    const descriptionControl = this.updateForm.get('description');
    const durationControl = this.updateForm.get('duration');
    const maxScoreControl = this.updateForm.get('maxScore');

    if (descriptionControl && durationControl && maxScoreControl) {
      this.updatedQuiz.description = descriptionControl.value;
      this.updatedQuiz.duration = durationControl.value;
      this.updatedQuiz.maxScore = maxScoreControl.value;

      const quizId = this.updatedQuiz.idquiz; // Use the correct property name for the quiz ID

      this.quizService.updateQuiz(quizId, this.updatedQuiz).subscribe(
        response => {
          console.log('Quiz updated successfully:', response);

          // Assuming your service returns the updated quiz details, update the local variable.
          this.updatedQuiz = response;

          this.router.navigate(['/allquizzes']);
        },
        error => {
          console.error('Error updating quiz:', error);
        }
      );
    } else {
      console.error('Form controls are null.');
    }
  }

}
