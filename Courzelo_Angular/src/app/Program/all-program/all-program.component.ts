import { Component } from '@angular/core';
import { CourseService } from 'src/app/Service/Course/Course/course.service';
import { ProgramService } from 'src/app/Service/Course/Program/program.service';
import { Course } from 'src/app/models/Course/Course';
import { Program } from 'src/app/models/Program/program';

@Component({
  selector: 'app-all-program',
  templateUrl: './all-program.component.html',
  styleUrls: ['./all-program.component.css']
})
export class AllProgramComponent {

  program?: Program[] ;
  currentProgram?: Program;
  currentIndex = -1;
  constructor(private progService: ProgramService) { }
  ngOnInit(): void {
    this.retrieveAllProgram();
  }
  setActiveProgram(c: Program, index: number): void {
    this.currentProgram = c;
    this.currentIndex = index;
  }
  retrieveAllProgram(): void {
    this.progService.getAll()
      .subscribe(
        (data: Program[]) => {
          this.program = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
        
        
  }

  deleteProgram(idprog: string | undefined): void {
    if (idprog) {
      this.progService.deleteProg(idprog).subscribe(
        () => {
          console.log(`Program with ID ${idprog} deleted successfully.`);
          // Mettez à jour la liste des programmes ou effectuez toute action nécessaire
          this.refreshProgramList(); // Rechargez la liste mise à jour des programmes
        },
        (error) => {
          console.error('Error deleting program:', error);
          // Gérez les scénarios d'erreur
        }
      );
    } else {
      console.error('Program ID is undefined. Cannot delete.');
    }
  }
  

  refreshProgramList(): void {
    // Here, you should fetch the updated list of classes from your service
    // and update the local variable 'classes'
    this.progService.getAll().subscribe(
      (updatedPrograms: any[]) => {
        this.program = updatedPrograms;
      },
      (error) => {
        console.error('Error refreshing class list:', error);
        // Handle error scenarios
      }
    );
  
  
}

}
