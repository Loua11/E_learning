import { Component } from '@angular/core';
import { CourseService } from 'src/app/Service/Course/Course/course.service';
import { Course } from 'src/app/models/Course/Course';

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.css']
})
export class AllCourseComponent {
  courses?: any[] =[];
  currentCourse?: Course;
  currentIndex = -1;
  constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    this.retrieveAllCourse();
  }
  setActiveCourse(c: Course, index: number): void {
    this.currentCourse = c;
    this.currentIndex = index;
  }
  retrieveAllCourse(): void {
    this.courseService.getAll()
      .subscribe(
        (data: Course[]) => {
          this.courses = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
        
        
  }

  deleteCourse(idCourse: string | undefined): void {
    if (idCourse) {
      this.courseService.deleteCourse(idCourse).subscribe(
        () => {
          console.log(`Course with ID ${idCourse} deleted successfully.`);
          // Update the class list or perform any necessary actions
          this.refreshCourseList(); // Reload the updated class list
        },
        (error) => {
          console.error('Error deleting Course:', error);
          // Handle error scenarios
        }
      );
    } else {
      console.error('Course ID is undefined. Cannot delete.');
    }
  }

  refreshCourseList(): void {
    // Here, you should fetch the updated list of classes from your service
    // and update the local variable 'classes'
    this.courseService.getAll().subscribe(
      (updatedCourses: any[]) => {
        this.courses = updatedCourses;
      },
      (error) => {
        console.error('Error refreshing Course list:', error);
        // Handle error scenarios
      }
    );
  
  
}
}
