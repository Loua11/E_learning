import { Component } from '@angular/core';
import { Lesson } from '../models/Lesson/lesson';
import { LessonService } from '../Service/Course/Lesson/lesson.service';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../Service/Forum/Comment/comment.service';
import { Comment } from '../models/Comment/Comment';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent {
  lesson?: any[] =[];
  currentLesson?: Lesson;
  currentIndex = -1;
  commentForm: FormGroup <any>;
  comment: Comment = { message: "" }; 

  constructor(private fb: FormBuilder , private commService:CommentService , private lessonService: LessonService, private route: ActivatedRoute,  private router:Router) {
    this.updateForm = this.fb.group({
     
      title: ['', Validators.required],
      content: ['', Validators.required],
     
      // Add more fields as needed
    });

    this.commentForm = this.fb.group({
      message: ['', [Validators.required]],
      datecomment: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.commentForm.valid) {
      const newComment: Comment = {
        message: this.commentForm.get('message')?.value,
        
      
      };
      
  
      if (newComment.message !== null  ) {
        this.commService.addComment(newComment).subscribe(
          () => {
            console.log('Course added successfully!');
            // Ajoutez ici la navigation ou d'autres actions après l'ajout réussi
           
          },
          (error) => {
            console.error('Error adding Comment ', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add Comment.');
      }
    } else {
      console.log('Form is invalid. Cannot add Comment.');
    }
  }

 
  setActiveCourse(c: Lesson, index: number): void {
    this.currentLesson = c;
    this.currentIndex = index;
  }

  retrieveAllLesson(): void {
    this.lessonService.getAll().subscribe(
      (data: Lesson[]) => {
        console.log('Lesson data from backend:', data);
        this.lesson = data;
  
        // Récupérer le contenu de chaque fichier
        const contentRequests = this.lesson.map((lesson: any) =>
          this.lessonService.getFileContent(lesson.content)
        );
  
        forkJoin(contentRequests).subscribe(
          (contents: string[]) => {
            // Update each lesson with its corresponding content
            if (this.lesson) {
              this.lesson.forEach((lesson, index) => {
                // Check if 'contents' is not undefined
                if (contents && contents[index] !== undefined) {
                  lesson.content = contents[index];
                }
              });
            }
          },
          (error) => {
            console.error('Error fetching file content:', error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadFile(content: string, fileName: string): void {
    // Créer un Blob avec le contenu
    const blob = new Blob([content], { type: this.getMimeType(this.getFileExtension(fileName)) });
  
    // Créer un objet URL à partir du Blob
    const url = window.URL.createObjectURL(blob);
  
    // Créer un élément d'ancrage pour déclencher le téléchargement
    const link = document.createElement('a');
    link.href = url;
  
    // Définir l'attribut de téléchargement avec le nom du fichier
    link.download = fileName;
  
    // Ajouter l'élément d'ancrage au document
    document.body.appendChild(link);
  
    // Simuler un clic sur l'élément d'ancrage pour déclencher le téléchargement
    link.click();
  
    // Retirer l'élément d'ancrage du document
    document.body.removeChild(link);
  
    // Libérer l'URL de l'objet Blob
    window.URL.revokeObjectURL(url);
  }
  
  
  getMimeType(fileExtension: string | undefined): string {
    switch (fileExtension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'webp':
        return 'image/webp';
      case 'mp4':
        return 'video/mp4';
      case 'avi':
        return 'video/x-msvideo';
      case 'pdf':
        return 'application/pdf';
      case 'txt':
        return 'text/plain';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      // Ajoutez d'autres cas au besoin pour d'autres extensions de fichier
      default:
        return 'application/octet-stream';
    }
  }

  getFileContent(content: string): void {
    this.lessonService.getFileContent(content).subscribe(
      (fileContent: string) => {
        console.log('File Content:', fileContent);
        // Faites ce que vous voulez avec le contenu du fichier ici
      },
      (error) => {
        console.error('Error fetching file content:', error);
      }
    );
  }


getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

isImage(content: Lesson): boolean {
  const extension = this.getFileExtension(content.content);
  return extension === 'jpg' || extension === 'png' || extension === 'gif' || extension === 'webp';
}

isVideo(content: Lesson): boolean {
  const extension = this.getFileExtension(content.content);
  return extension === 'mp4' || extension === 'avi';
}

isDocument(content: Lesson): boolean {
  const extension = this.getFileExtension(content.content);
  return extension === 'pdf' || extension === 'txt' || extension === 'docx';
}

isSupported(content: Lesson): boolean {
  const extension = this.getFileExtension(content.content);
  return this.isImage(content) || this.isVideo(content) || this.isDocument(content);
}

updateForm: FormGroup;
  updatedLesson: any ={ title:'' ,content: "" }; 

  

  ngOnInit(): void {
    
    this.retrieveAllLesson();
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

showCommentField: boolean = true;
  
}
