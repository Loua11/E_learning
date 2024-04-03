import { Component } from '@angular/core';
import { QuizService } from 'src/app/Service/Evaluation/quiz.service';
import { Quiz } from 'src/app/models/Evaluation/quiz';
import Swal from "sweetalert2";

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


    Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed)
      {
        if (idquiz) {
          this.quizserv.deleteQuiz(idquiz).subscribe(
            () => {
              console.log('Quiz with ID ${idquiz} deleted successfully.');
              // Update the class list or perform any necessary actions
              this.retrieveAllQuizzes(); // Reload the updated class list
              Swal.fire("Success !!","Quiz deleted",'success')

            },
            (error) => {
              console.error('Error deleting Quiz:', error);
              Swal.fire("Error !!","Error in deleting quiz",'error')
              // Handle error scenarios
            }
          );
        } else {
          console.error('Quiz ID is undefined. Cannot delete.');
        }

      }

    })



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


