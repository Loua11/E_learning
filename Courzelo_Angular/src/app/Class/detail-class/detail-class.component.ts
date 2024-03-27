import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/Service/Course/Class/class.service';

@Component({
  selector: 'app-detail-class',
  templateUrl: './detail-class.component.html',
  styleUrls: ['./detail-class.component.css']
})
export class DetailClassComponent {
  classDetails: any;

  constructor(private classService: ClassService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const classid = params.get('id');
      if (classid !== null) {
        this.classService.retrieveClass(classid).subscribe(
          (classDetails: any) => {
            this.classDetails = classDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
