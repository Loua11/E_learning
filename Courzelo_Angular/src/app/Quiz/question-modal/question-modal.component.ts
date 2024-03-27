// question-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/app/models/Evaluation/question';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.css']
})
export class QuestionModalComponent {
  @Input() isVisible = false; 
  @Input() questions: Question[] = []; 
  @Output() questionsSelected = new EventEmitter<string[]>();
  selectedQuestionIds: string[] = [];


  constructor() { }

  close() {
    this.isVisible = false;
    this.questionsSelected.emit(this.selectedQuestionIds); // Si vous souhaitez émettre les choix lors de la fermeture
  }
  

  submit() {
    this.questionsSelected.emit(this.selectedQuestionIds);
    this.close();
  }

  onCheckboxChange(id: string, event: Event) {
    // Effectuez le casting de event.target en HTMLInputElement à l'intérieur de la méthode
    const inputElement = event.target as HTMLInputElement;
  
    // Utilisez inputElement.checked pour accéder à la propriété checked
    if (inputElement.checked) {
      this.selectedQuestionIds.push(id);
    } else {
      this.selectedQuestionIds = this.selectedQuestionIds.filter(qid => qid !== id);
    }
  }
}
