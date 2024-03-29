import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/Service/Course/Lesson/lesson.service';
import { Lesson } from 'src/app/models/Lesson/lesson';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent {
  lessonForm: FormGroup <any>;
  lesson: any = { title:'' ,content: "" }; 
  uploadedFileUrl!: string;
  fileType!: string;
  
 
  constructor(private fb:FormBuilder, private lessonService:LessonService, private route: ActivatedRoute, private router:Router){
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(3)]],
    
    });

  }
  ngOnInit(): void {}

 
  onSubmit() {
    if (this.lessonForm.valid) {
      const newLesson: Lesson = {
        title: this.lessonForm.get('title')?.value,
        content: this.lessonForm.get('content')?.value,
        
       
      };
      
  
      if (newLesson.title !== null && newLesson.content !== null ) {
        this.lessonService.addLesson(newLesson).subscribe(
          () => {
            console.log('Lesson added successfully!');
            // Ajoutez ici la navigation ou d'autres actions après l'ajout réussi
            this.router.navigate(['/allLesson']);
          },
          (error) => {
            console.error('Error adding Lesson ', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add Lesson.');
      }
    } else {
      console.log('Form is invalid. Cannot add Lesson.');
    }
  }
// add-lesson.component.ts
// ...

onFileSelected(event: any) {
  const file = event.target.files[0];
  this.fileType = this.getFileType(file);
  this.uploadedFileUrl = URL.createObjectURL(file);

  // Récupérez le titre depuis le formulaire
  const title = this.lessonForm.get('title')?.value;

  // Appel au service d'upload pour envoyer le fichier au backend
  this.lessonService.uploadFile(file, title).subscribe(
    (response) => {
      console.log('File uploaded successfully:', response);
      // Mettez à jour votre modèle avec les données renvoyées par le backend si nécessaire
    },
    (error) => {
      console.error('Error uploading file:', error);
    }
  );
}


  getFileType(file: File): string {
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.gif')) {
      return 'image';
    } else if (fileName.endsWith('.mp4') || fileName.endsWith('.avi')) {
      return 'video';
    } else if (fileName.endsWith('.pdf') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
      return 'document';
    } else {
      return 'other';
    }
  }

  isFieldInvalid(field: string) {
    const control = this.lessonForm.get(field);
    return control && control.touched && control.invalid;
  }
  
}
