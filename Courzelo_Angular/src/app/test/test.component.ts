import { Component } from '@angular/core';
import { LessonService } from '../Service/Course/Lesson/lesson.service';
import { Lesson } from '../models/Lesson/lesson';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  lessons: any[] = [];
  fileContent: string | SafeResourceUrl | ArrayBuffer | null = null;

  constructor(private lessonService: LessonService, private sanitizer: DomSanitizer, private router:Router) { }

  getSafeUrl(fileContent: string): SafeResourceUrl {
    // Utilisez le DOMSanitizer pour sécuriser l'URL du contenu du fichier
    return this.sanitizer.bypassSecurityTrustResourceUrl(fileContent);
  }

  ngOnInit(): void {
    this.getAllLessons();
  }

  getAllLessons(): void {
    this.lessonService.getAll().subscribe(
      (lessons: any[]) => {
        this.lessons = lessons;
        // Pour chaque leçon, récupérez et affichez le contenu du fichier
        this.lessons.forEach((lesson: any) => {
          this.getFileContent(lesson.content);
        });
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }

  // getFileContent(content: string): void {
  //   this.lessonService.getFileContent(content).subscribe(
  //     (fileContent: any) => {
  //       // Faites quelque chose avec le contenu du fichier, par exemple l'afficher dans la console
  //       console.log('File Content:', fileContent);
        
      
  //     },
  //     (error) => {
  //       console.error('Error fetching file content:', error);
  //     }
  //   );
  // }

  getFileContent(content: string): void {
    this.lessonService.getFileContent(content).subscribe(
      (fileContent: any) => {
        console.log('File Content:', fileContent);
        this.fileContent = fileContent; // Met à jour la propriété avec le contenu du fichier
      },
      (error) => {
        console.error('Error fetching file content:', error);
      }
    );
  }
}
