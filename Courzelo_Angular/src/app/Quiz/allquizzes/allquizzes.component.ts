import { Component } from '@angular/core';
import { QuizService } from 'src/app/Service/Evaluation/quiz.service';
import { Quiz } from 'src/app/models/Evaluation/quiz';

@Component({
  selector: 'app-allquizzes',
  templateUrl: './allquizzes.component.html',
  styleUrls: ['./allquizzes.component.css']
})
export class AllquizzesComponent {
  quizzes?: Quiz[];
  currentQuiz?: Quiz;
  currentIndex = -1;
   ngOnInit(): void {
    this.retrieveAllQuizzes();

  }
 
  constructor(private quizserv: QuizService) { }
 
  
  setActiveQuiz(q: Quiz, index: number): void {
    this.currentQuiz=q;
    this.currentIndex = index;
  }

  
  deleteQuiz(idquiz: string | undefined): void {
    if (idquiz) {
      this.quizserv.deleteQuiz(idquiz).subscribe(
        () => {
          console.log('Quiz with ID ${idquiz} deleted successfully.');
          // Update the class list or perform any necessary actions
          this.retrieveAllQuizzes(); // Reload the updated class list
        },
        (error) => {
          console.error('Error deleting Quiz:', error);
          // Handle error scenarios
        }
      );
    } else {
      console.error('Quiz ID is undefined. Cannot delete.');
    }
  }
  retrieveAllQuizzes(): void {
    this.quizserv.getAll()
    .subscribe(
      data => {
        this.quizzes = data;
        console.log(data);
      },
      error => {
        console.log('Erreur complète:', error);
      }
    );
    }    
}


