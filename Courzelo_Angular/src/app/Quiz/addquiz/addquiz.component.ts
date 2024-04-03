import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { QuestionService } from 'src/app/Service/Evaluation/question.service';
import { QuizService } from 'src/app/Service/Evaluation/quiz.service';
import { Question } from 'src/app/models/Evaluation/question';
import { Quiz } from 'src/app/models/Evaluation/quiz';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.css']
})
export class AddquizComponent implements OnInit {
openModel(arg0: any) {
throw new Error('Method not implemented.');
}
  quizForm: FormGroup;
  questions: Question[] = []; // Assume Question is your model for questions
  selectedQuestions: { [key: string]: boolean } = {}; // Tracks which questions are selected
modalContent: any;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private questionService: QuestionService,
    private router: Router,
    private modalService: NgbModal// Injectez NgbModal

  ) {
    this.quizForm = this.fb.group({
      description: ['', Validators.required],
      duration: ['', Validators.required],
      maxScore: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      data => this.questions = data,
      error => console.error('Error loading questions', error)
    );
  }
  isChecked: boolean = false;

  checkBoxChange(questionId: string) {
    // Ici, vous pouvez gérer la logique à exécuter lorsque l'état de la case à cocher change.
    // Par exemple, mettre à jour l'objet selectedQuestions avec le nouvel état de la case à cocher.
    this.selectedQuestions[questionId] = !this.selectedQuestions[questionId];

    // Logique supplémentaire si nécessaire...
  }


  updateSelection(questionId: string, isChecked: boolean): void {
    this.selectedQuestions[questionId] = isChecked;
  }

  saveQuestions(): void {
    // Collect selected question IDs
    const selectedQuestionIds = Object.keys(this.selectedQuestions).filter(id => this.selectedQuestions[id]);
    console.log("selected question",this.selectedQuestions)

    // Prepare quiz data
    const newQuiz: any = {
      ...this.quizForm.value,
      questions: selectedQuestionIds
    };
    console.log("data",newQuiz);

    // Call service to save new quiz
    this.quizService.addQuiz(newQuiz).subscribe(
      () => {
        console.log('Quiz added successfully!');
        this.router.navigate(['/allquizzes']);
        this.closeModel(); // Assuming you have a closeModel method to close the modal
      },
      error => console.error('Error adding Quiz', error)
    );
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-title' }).result.then(
      (result: any) => {
        // Logique à exécuter après la fermeture du modal si nécessaire
        console.log('Modal fermé avec le bouton "Save Changes"');
      },
      (reason: any) => {
        // Logique à exécuter si le modal est fermé sans cliquer sur le bouton "Save Changes"
        console.log('Modal fermé sans cliquer sur le bouton "Save Changes". Raison :', reason);
      }
    );
  }
  closeModel() {
  this.modalService.dismissAll();
  }


  isFieldInvalid(field: string): boolean {
    const control = this.quizForm.get(field);
    return control?.touched && control?.invalid || false;
  }

  // onSubmit(): void {
  //   if (this.quizForm.valid) {
  //     this.saveQuestions();
  //   } else {
  //     console.log('Form is invalid. Cannot add Quiz.');
  //   }
  // }
}
