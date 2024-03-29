import { Component } from '@angular/core';
import { ModuleService } from 'src/app/Service/Course/Module/module.service';
import { Module } from 'src/app/models/Module/module';

@Component({
  selector: 'app-all-module',
  templateUrl: './all-module.component.html',
  styleUrls: ['./all-module.component.css']
})
export class AllModuleComponent {
  module?: any[] =[];
  currentModule?: Module;
  currentIndex = -1;
  constructor(private moduleService: ModuleService) { }
  ngOnInit(): void {
    this.retrieveAllModule();
  }
  setActiveCourse(c: Module, index: number): void {
    this.currentModule = c;
    this.currentIndex = index;
  }
  retrieveAllModule(): void {
    this.moduleService.getAll()
      .subscribe(
        (data: Module[]) => {
          this.module = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
        
        
  }
  deleteModule(idmodule: string | undefined): void {
    if (idmodule) {
      this.moduleService.deleteModule(idmodule).subscribe(
        () => {
          console.log(`module with ID ${idmodule} deleted successfully.`);
          // Update the class list or perform any necessary actions
          this.refreshModuleList(); // Reload the updated class list
        },
        (error) => {
          console.error('Error deleting module:', error);
          // Handle error scenarios
        }
      );
    } else {
      console.error('module ID is undefined. Cannot delete.');
    }
  }

  refreshModuleList(): void {
    // Here, you should fetch the updated list of classes from your service
    // and update the local variable 'classes'
    this.moduleService.getAll().subscribe(
      (updatedM: any[]) => {
        this.module = updatedM;
      },
      (error) => {
        console.error('Error refreshing module list:', error);
        // Handle error scenarios
      }
    );
  
  
}

}
