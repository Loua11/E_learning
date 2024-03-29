import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/Service/Course/Course/course.service';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.css']
})
export class DetailCourseComponent {
  courseDetails: any;

  constructor(private courseSrvice: CourseService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseid = params.get('id');
      if (courseid !== null) {
        this.courseSrvice.retrieveCourse(courseid).subscribe(
          (coursDetails: any) => {
            this.courseDetails = coursDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  isImage(url: string): boolean {
    // Vérifier l'extension du fichier
    return url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null;
}

isPDF(url: string): boolean {
  return url.toLowerCase().match(/\.(pdf|doc|txt)$/) != null;
}

isVideo(url: string): boolean {
    return url.toLowerCase().match(/\.(mp4|ogg|webm)$/) != null;
}
}
