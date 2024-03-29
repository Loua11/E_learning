import { Component } from '@angular/core';
import { Class } from 'src/app/models/Class/class';
import { ClassService } from 'src/app/Service/Course/Class/class.service';

@Component({
  selector: 'app-all-class',
  templateUrl: './all-class.component.html',
  styleUrls: ['./all-class.component.css']
})
export class AllClassComponent {

  classes?: Class[] ;
  currentClass?: Class;
  currentIndex = -1;
  constructor(private classervice: ClassService) { }
  ngOnInit(): void {
    this.retrieveAllClass();

  }
  setActiveClass(c: Class, index: number): void {
    this.currentClass = c;
    this.currentIndex = index;
  }
  retrieveAllClass(): void {
    this.classervice.getAll()
      .subscribe(
        data => {
          this.classes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteClass(idClass: string | undefined): void {
    if (idClass) {
      this.classervice.deleteClass(idClass).subscribe(
        () => {
          console.log(`Class with ID ${idClass} deleted successfully.`);
          // Update the class list or perform any necessary actions
          this.refreshClassList(); // Reload the updated class list
        },
        (error) => {
          console.error('Error deleting class:', error);
          // Handle error scenarios
        }
      );
    } else {
      console.error('Class ID is undefined. Cannot delete.');
    }
  }

  refreshClassList(): void {
    // Here, you should fetch the updated list of classes from your service
    // and update the local variable 'classes'
    this.classervice.getAll().subscribe(
      (updatedClasses: any[]) => {
        this.classes = updatedClasses;
      },
      (error) => {
        console.error('Error refreshing class list:', error);
        // Handle error scenarios
      }
    );
  
  
}
}
