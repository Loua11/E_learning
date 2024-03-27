import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from 'src/app/Service/Course/Module/module.service';
import { Module } from 'src/app/models/Module/module';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.css']
})
export class UpdateModuleComponent {
  updateForm: FormGroup;
  updatedModule: any ={ titleModule:'' ,nbreHeure: "", description:"" ,progress:"" }; 

  module?: Module[] ;
  constructor(private fb: FormBuilder, private moduleService: ModuleService, private route: ActivatedRoute,  private router:Router) {
    this.updateForm = this.fb.group({
     
      titleModule: ['', Validators.required],
      nbreHeure: ['', Validators.required],
      description: ['', Validators.required],
      progress: ['', Validators.required],
      // Add more fields as needed
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Moduleid = params.get('id');
      if (Moduleid !== null) {
        this.moduleService.retrieveModule(Moduleid).subscribe(
        (lessDetails: any) => {
          this.updatedModule = lessDetails;
          this.updateForm.patchValue(lessDetails); // Populate the form with class details
        },
        error => {
          console.log(error);
        }
      );
  }});
} 

updateModule() {
  console.log('Before Update - Updated Class:', this.updatedModule);

  const titleModule = this.updateForm.get('titleModule');
  const nbreHeure = this.updateForm.get('nbreHeure');
  const description = this.updateForm.get('description');
  const progress = this.updateForm.get('progress');

  if (titleModule && nbreHeure && description && progress) {
    this.updatedModule.titleModule = titleModule.value;
    this.updatedModule.nbreHeure = nbreHeure.value;
    this.updatedModule.description = description.value;
    this.updatedModule.progress = progress.value;
   

    const idModule = this.updatedModule.idModule;

    this.moduleService.updateModule(idModule, this.updatedModule).subscribe(
      (response) => {
        console.log('Module updated successfully:', response);

        // Assuming your service returns the updated class details, update the local variable.
        this.updatedModule = response;

        console.log('After Update - Updated Module:', this.updatedModule);

        this.router.navigate(['/allModule']);
      },
      (error) => {
        console.error('Error updating Module:', error);
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
