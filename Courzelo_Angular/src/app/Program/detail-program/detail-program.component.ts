import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramService } from 'src/app/Service/Course/Program/program.service';

@Component({
  selector: 'app-detail-program',
  templateUrl: './detail-program.component.html',
  styleUrls: ['./detail-program.component.css']
})
export class DetailProgramComponent {
  programDetails: any;

  constructor(private progService: ProgramService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Programid = params.get('id');
      if (Programid !== null) {
        this.progService.retrieveProgram(Programid).subscribe(
          (progDetails: any) => {
            this.programDetails = progDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
  
}
