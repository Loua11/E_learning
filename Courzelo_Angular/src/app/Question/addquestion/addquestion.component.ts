import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/Service/Evaluation/question.service';
import { Question } from 'src/app/models/Evaluation/question';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  questionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService, private router: Router) {
    this.questionForm = this.formBuilder.group({
      questionText: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      options: this.formBuilder.array([this.createOption()])
    });
  }

  ngOnInit() {}

  createOption(): FormControl {
    return this.formBuilder.control('', Validators.required);
  }

  addOption() {
    const optionsArray = this.questionForm.get('options') as FormArray;
    optionsArray.push(this.createOption());
  }

  removeOption(index: number) {
    const optionsArray = this.questionForm.get('options') as FormArray;
    optionsArray.removeAt(index);
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const question: Question = {
        questionText: this.questionForm.value.questionText,
        correctanswer: this.questionForm.value.correctAnswer,
        options: this.questionForm.value.options
      };

      this.questionService.addQuestion(question).subscribe(
        () => {
          console.log('Question added successfully.');
          this.router.navigate(['/allquestions']);
        },
        (error) => {
          console.error('Error adding question', error);
        }
      );
    } else {
      this.markFormControlsAsTouched(this.questionForm);
    }
  }

  markFormControlsAsTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormControlsAsTouched(control);
      }
    });
  }

  isFieldInvalid(field: string) {
    const control = this.questionForm.get(field);
    return control && control.touched && control.invalid;
  }
  isOptionInvalid(index: number) {
    const optionsArray = this.questionForm.get('options');
    if (optionsArray instanceof FormArray) {
      const optionControl = optionsArray.at(index) as FormControl;
      return optionControl && optionControl.touched && optionControl.invalid;
    }
    return false;
  }
  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }
}