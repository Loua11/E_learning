import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/Service/Evaluation/question.service';
import { Question } from 'src/app/models/Evaluation/question';

@Component({
  selector: 'app-updatequestion',
  templateUrl: './updatequestion.component.html',
  styleUrls: ['./updatequestion.component.css']
})
export class UpdatequestionComponent implements OnInit {
  updateForm: FormGroup;
  idquestion!: string;
  optionsArray: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) {
    this.updateForm = this.formBuilder.group({
      questionText: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      options: this.formBuilder.array([])
    });
    this.optionsArray = this.updateForm.get('options') as FormArray;
  }

  ngOnInit(): void {
    this.idquestion = this.route.snapshot.params['id'];
    this.loadQuestionDetails();
  }

  loadQuestionDetails(): void {
    this.questionService.retrieveQuestion(this.idquestion).subscribe(
      (data: Question) => {
        this.updateForm.patchValue({
          questionText: data.questionText,
          correctAnswer: data.correctanswer
        });
        if (data.options) {
          this.setExistingOptions(data.options);
        }
      },
      (error) => {
        console.error('Error loading question details', error);
      }
    );
  }
  isFieldInvalid(field: string) {
    const control = this.updateForm.get(field);
    return control && control.touched && control.invalid;
  }
  setExistingOptions(options: string[]): void {
    options.forEach((option) => {
      this.optionsArray.push(this.formBuilder.control(option || '', Validators.required));
    });
  }

  addOption(): void {
    this.optionsArray.push(this.formBuilder.control('', Validators.required));
  }
  
  removeOption(index: number): void {
    this.optionsArray.removeAt(index);
  }

  updateQuestion(): void {
    if (this.updateForm.valid) {
      const updatedQuestion: Partial<Question> = {
        idquestion: this.idquestion,
        questionText: this.updateForm.value.questionText,
        correctanswer: this.updateForm.value.correctAnswer,
        options: this.updateForm.value.options
      };
      this.questionService.updateQuestion(this.idquestion, updatedQuestion).subscribe(
        (data) => {
          console.log('Question updated successfully', data);
          this.router.navigate(['/allquestions']);
        },
        (error) => {
          console.error('Error updating question', error);
        }
      );
    }
  }
}