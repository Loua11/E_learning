import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/Service/Course/Lesson/lesson.service';
import { Lesson } from 'src/app/models/Lesson/lesson';

@Component({
  selector: 'app-update-lesson',
  templateUrl: './update-lesson.component.html',
  styleUrls: ['./update-lesson.component.css']
})
export class UpdateLessonComponent {
  updateForm: FormGroup;
  updatedLesson: any ={ title:'' ,content: "" }; 

  lesson?: Lesson[] ;
  constructor(private fb: FormBuilder, private lessonService: LessonService, private route: ActivatedRoute,  private router:Router) {
    this.updateForm = this.fb.group({
     
      title: ['', Validators.required],
      content: ['', Validators.required],
     
      // Add more fields as needed
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Lessonid = params.get('id');
      if (Lessonid !== null) {
        this.lessonService.retrieveLesson(Lessonid).subscribe(
        (lessDetails: any) => {
          this.updatedLesson = lessDetails;
          this.updateForm.patchValue(lessDetails); // Populate the form with class details
        },
        error => {
          console.log(error);
        }
      );
  }});
} 

updateModule() {
  console.log('Before Update - Updated Class:', this.updatedLesson);

  const title = this.updateForm.get('title');
  const content = this.updateForm.get('content');


  if (title && content ) {
    this.updatedLesson.title = title.value;
    this.updatedLesson.content = content.value;
  

    const idlesson = this.updatedLesson.idlesson;

    this.lessonService.updateLesson(idlesson, this.updatedLesson).subscribe(
      (response) => {
        console.log('Lesson updated successfully:', response);

        // Assuming your service returns the updated class details, update the local variable.
        this.updatedLesson = response;

        console.log('After Update - Updated Lesson:', this.updatedLesson);

        this.router.navigate(['/allLesson']);
      },
      (error) => {
        console.error('Error updating Lesson:', error);
      }
    );
  } else {
    console.error('Form controls are null.');
  }
}
isFieldInvalid(field: string) {
  const control = this.updateForm.get(field);
  return control && control.touched && control.invalid;
}
}
