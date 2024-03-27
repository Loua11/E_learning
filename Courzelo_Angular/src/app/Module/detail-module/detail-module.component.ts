import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from 'src/app/Service/Course/Module/module.service';

@Component({
  selector: 'app-detail-module',
  templateUrl: './detail-module.component.html',
  styleUrls: ['./detail-module.component.css']
})
export class DetailModuleComponent {
moduleDetails: any;

  constructor(private moduleService: ModuleService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Moduleid = params.get('id');
      if (Moduleid !== null) {
        this.moduleService.retrieveModule(Moduleid).subscribe(
          (modDetails: any) => {
            this.moduleDetails = modDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}

