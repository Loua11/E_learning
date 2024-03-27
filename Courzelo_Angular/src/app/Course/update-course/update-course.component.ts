import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/Service/Course/Course/course.service';
import { Course } from 'src/app/models/Course/Course';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent {
  updateForm: FormGroup;
  updatedCourse: any = {idCourse:'', title:'' ,content: "", datecourse: "" }; 

  com?: Course[] ;
  constructor(private fb: FormBuilder, private courseService: CourseService, private route: ActivatedRoute,  private router:Router) {
    this.updateForm = this.fb.group({
     
      title: ['', Validators.required],
      content: ['', Validators.required],
      datecourse: ['', Validators.required],
   
      // Add more fields as needed
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseid = params.get('id');
      if (courseid !== null) {
        this.courseService.retrieveCourse(courseid).subscribe(
        (coursDetails: any) => {
          this.updatedCourse = coursDetails;
          this.updatedCourse.datecourse = new Date(coursDetails.datecourse).toISOString().split('T')[0];
          this.updateForm.patchValue(coursDetails); // Populate the form with class details
        },
        error => {
          console.log(error);
        }
      );
  }});
  }
  isFieldInvalid(field: string) {
    const control = this.updateForm.get(field);
    return control && control.touched && control.invalid;
  }


  updateCourse() {
    console.log('Before Update - Updated Course:', this.updatedCourse);
  
    const title = this.updateForm.get('title');
    const content = this.updateForm.get('content');
 
    const datecourse = this.updateForm.get('datecourse');
   
  
    if (title && content && datecourse ) {
      this.updatedCourse.title = title.value;
      this.updatedCourse.content = content.value;
      this.updatedCourse.datecourse = datecourse.value;
   
  
      const courseid = this.updatedCourse.idCourse;
  
      this.courseService.updateCourse(courseid, this.updatedCourse).subscribe(
        (response) => {
          console.log('Course updated successfully:', response);
  
          // Assuming your service returns the updated class details, update the local variable.
          this.updatedCourse = response;
  
          console.log('After Update - Updated Course:', this.updatedCourse);
  
          this.router.navigate(['/allCourse']);
        },
        (error) => {
          console.error('Error updating Course:', error);
        }
      );
    } else {
      console.error('Form controls are null.');
    }
  }


}
