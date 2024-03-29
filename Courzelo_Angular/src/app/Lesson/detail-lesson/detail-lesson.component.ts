import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from 'src/app/Service/Course/Lesson/lesson.service';

@Component({
  selector: 'app-detail-lesson',
  templateUrl: './detail-lesson.component.html',
  styleUrls: ['./detail-lesson.component.css']
})
export class DetailLessonComponent {
  lessonDetails: any;

  constructor(private lessonService: LessonService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Lessonid = params.get('id');
      if (Lessonid !== null) {
        this.lessonService.retrieveLesson(Lessonid).subscribe(
          (lessDetails: any) => {
            this.lessonDetails = lessDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}

