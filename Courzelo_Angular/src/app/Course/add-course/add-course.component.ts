import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/Service/Course/Course/course.service';
import { Course } from 'src/app/models/Course/Course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  courseForm: FormGroup <any>;
  course: any = { title:'' ,content: "", datecourse: "" }; 
  
  isFieldInvalid(field: string) {
    const control = this.courseForm.get(field);
    return control && control.touched && control.invalid;
  }
  constructor(private fb:FormBuilder, private courseService:CourseService, private route: ActivatedRoute, private router:Router){
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(3)]],
      datecourse: ['', Validators.required],
    });

  }
  ngOnInit(): void {}

 
  onSubmit() {
    if (this.courseForm.valid) {
      const newCourse: Course = {
        title: this.courseForm.get('title')?.value,
        content: this.courseForm.get('content')?.value,
        
        datecourse: this.courseForm.get('datecourse')?.value,
      };
      
  
      if (newCourse.title !== null && newCourse.content !== null && newCourse.datecourse !== null) {
        this.courseService.addCourse(newCourse).subscribe(
          () => {
            console.log('Course added successfully!');
            // Ajoutez ici la navigation ou d'autres actions après l'ajout réussi
            this.router.navigate(['/allCourse']);
          },
          (error) => {
            console.error('Error adding Course ', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add Course.');
      }
    } else {
      console.log('Form is invalid. Cannot add Course.');
    }
  }
}
