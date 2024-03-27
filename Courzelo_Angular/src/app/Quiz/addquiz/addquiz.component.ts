import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/Service/Evaluation/quiz.service';
import { Question } from 'src/app/models/Evaluation/question';
import { Quiz, QuizWithQuestionReferences } from 'src/app/models/Evaluation/quiz';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.css']
})
export class AddquizComponent implements OnInit {
  quizForm: FormGroup;
  availableQuestions: Question[] = [];
  isQuestionModalVisible: boolean = false; // Utilisé pour contrôler la visibilité de la fenêtre modale
  selectedQuestionIds: string[] = []; // Stockera les ID des questions sélectionnées

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.quizForm = this.fb.group({
      description: ['', Validators.required],
      duration: ['', Validators.required],
      maxScore: ['', Validators.required],
      // Le contrôle pour questions est maintenant géré séparément, donc il est retiré ici
    });
  }

  ngOnInit(): void {
    this.loadAvailableQuestions();
  }

  loadAvailableQuestions() {
  }

  openQuestionModal(): void {
    this.isQuestionModalVisible = true;
    console.log('Question modal should open.'); // Ajoutez ceci pour le debug
  }
  

  closeQuestionModal(): void {
    this.isQuestionModalVisible = false; 
  }
 /* openModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
    } 
  }

  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
    } 
  }*/

  handleQuestionsSelected(selectedIds: string[]): void {
    this.selectedQuestionIds = selectedIds; 
    this.closeQuestionModal(); }

  onSubmit() {
    if (this.quizForm.valid) {
      // Créer l'objet Quiz pour l'envoi, qui contient les références aux questions
      const newQuizWithReferences: QuizWithQuestionReferences = {
        description: this.quizForm.value.description,
        duration: Number(this.quizForm.value.duration),
        maxScore: Number(this.quizForm.value.maxScore),
        questions: this.selectedQuestionIds.map((id: string) => ({ // Utilisez les ID sélectionnés dans la modale
          $ref: "question",
          $id: { $oid: id }
        }))
      };

      // ... logique existante pour envoyer le nouveau quiz
    }
  }
  
  

  isFieldInvalid(field: string) {
    const control = this.quizForm.get(field);
    return control && control.touched && control.invalid;
  }
}
