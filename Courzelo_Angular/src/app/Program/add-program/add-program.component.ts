import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService } from 'src/app/Service/Course/Program/program.service';
import { Program, Speciality } from 'src/app/models/Program/program';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent {
  progForm: FormGroup <any>;
  program: any = { nomProg:'' ,description: "", speciality:"" }; 
  speciality = Object.values(Speciality);
 
  constructor(private fb:FormBuilder, private progService:ProgramService, private route: ActivatedRoute, private router:Router){
    this.progForm = this.fb.group({
      nomProg: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(3)]],
      speciality: ['', [Validators.required, Validators.minLength(3)]],
    });

  }
  ngOnInit(): void {}

  onSubmit() {
    if (this.progForm.valid) {
      const newProg: Program = {
        nomProg: this.progForm.get('nomProg')?.value,
        description: this.progForm.get('description')?.value,
        speciality: this.progForm.get('speciality')?.value
       
      };
      
  
      if (newProg.nomProg !== null && newProg.description !== null && newProg.speciality !== null ) {
        this.progService.addProg(newProg).subscribe(
          () => {
            console.log('Module added successfully!');
            // Ajoutez ici la navigation ou d'autres actions après l'ajout réussi
            this.router.navigate(['/allProgram']);
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
    const control = this.progForm.get(field);
    return control && control.touched && control.invalid;
  }
}
