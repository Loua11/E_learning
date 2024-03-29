import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from 'src/app/Service/Course/Module/module.service';
import { Module } from 'src/app/models/Module/module';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent {
  moduleForm: FormGroup <any>;
  module: any = { titleModule:'' ,nbreHeure: "", description:"" ,progress:"" }; 
  
 
  constructor(private fb:FormBuilder, private moduleService:ModuleService, private route: ActivatedRoute, private router:Router){
    this.moduleForm = this.fb.group({
      progress:['', Validators.required],
      titleModule: ['', Validators.required],
      nbreHeure: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });

  }
  ngOnInit(): void {}

 
  onSubmit() {
    if (this.moduleForm.valid) {
      const newModule: Module = {
        progress: this.moduleForm.get('description')?.value,
        titleModule: this.moduleForm.get('titleModule')?.value,
        nbreHeure: this.moduleForm.get('nbreHeure')?.value,
        description: this.moduleForm.get('description')?.value,
        
       
      };
      
  
      if (newModule.progress !== null && newModule.titleModule !== null && newModule.nbreHeure !== null && newModule.description !== null ) {
        this.moduleService.addModule(newModule).subscribe(
          () => {
            console.log('Module added successfully!');
            // Ajoutez ici la navigation ou d'autres actions après l'ajout réussi
            this.router.navigate(['/allModule']);
          },
          (error) => {
            console.error('Error adding Module ', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add Module.');
      }
    } else {
      console.log('Form is invalid. Cannot add Module.');
    }
  }
  isFieldInvalid(field: string) {
    const control = this.moduleForm.get(field);
    return control && control.touched && control.invalid;
  }
}
