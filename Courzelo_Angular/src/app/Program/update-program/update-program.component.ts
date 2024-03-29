import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService } from 'src/app/Service/Course/Program/program.service';
import { Speciality } from 'src/app/models/Program/program';

@Component({
  selector: 'app-update-program',
  templateUrl: './update-program.component.html',
  styleUrls: ['./update-program.component.css']
})
export class UpdateProgramComponent {
  updateForm: FormGroup;
  updatedProgram:  any = { nomProg:'' ,description: "", speciality:"" }; 
  speciality = Object.values(Speciality);
  message = '';

  constructor(private fb: FormBuilder, private progService: ProgramService, private route: ActivatedRoute,  private router:Router) {
    this.updateForm = this.fb.group({
      nomProg: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(3)]],
      speciality: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idprog = params.get('id');
      if (idprog !== null) {
        this.progService.retrieveProgram(idprog).subscribe(
        (progDetails: any) => {
          this.updatedProgram = progDetails;
          this.updateForm.patchValue(progDetails); // Populate the form with class details
        },
        error => {
          console.log(error);
        }
      );
  }});
  }
  isFieldInvalid(field: string) {
    const control = this.updateForm.get(field);
    return control && control.touched && control.invalid;
  }


  updateProgram() {
    console.log('Before Update - Updated Class:', this.updatedProgram);
  
    const nomProg = this.updateForm.get('nomProg');
    const description = this.updateForm.get('description');
    const speciality = this.updateForm.get('speciality');
  
    if (nomProg && description && speciality) {
      this.updatedProgram.nomProg = nomProg.value;
      this.updatedProgram.description = description.value;
      this.updatedProgram.speciality = speciality.value;
  
      const idprog = this.updatedProgram.idprog;
  
      this.progService.updateProgram(idprog, this.updatedProgram).subscribe(
        (response) => {
          console.log('Program updated successfully:', response);
  
          // Assuming your service returns the updated class details, update the local variable.
          this.updatedProgram = response;
  
          console.log('After Update - Updated Program:', this.updatedProgram);
  
          this.router.navigate(['/allProgram']);
        },
        (error) => {
          console.error('Error updating Program:', error);
        }
      );
    } else {
      console.error('Form controls are null.');
    }
  }
}
