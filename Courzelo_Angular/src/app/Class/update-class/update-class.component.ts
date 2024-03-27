import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/Service/Course/Class/class.service';
import { Class, Level } from 'src/app/models/Class/class';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css']
})
export class UpdateClassComponent {
  updateForm: FormGroup;
  updatedClass: any = { capacity: '', level: '', progress: '' };
  level = Object.values(Level);
  classes?: Class[] ;
  constructor(private fb: FormBuilder, private classService: ClassService, private route: ActivatedRoute,  private router:Router) {
    this.updateForm = this.fb.group({
      
      capacity: ['', Validators.required],
      level: ['', Validators.required],
      progress: ['', Validators.required],
      // Add more fields as needed
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const classid = params.get('id');
      if (classid !== null) {
        this.classService.retrieveClass(classid).subscribe(
        (classDetails: any) => {
          this.updatedClass = classDetails;
          this.updateForm.patchValue(classDetails); // Populate the form with class details
        },
        error => {
          console.log(error);
        }
      );
  }});
  }
  


  updateClass() {
    console.log('Before Update - Updated Class:', this.updatedClass);
  
    const capacityControl = this.updateForm.get('capacity');
    const levelControl = this.updateForm.get('level');
    const progressControl = this.updateForm.get('progress');
  
    if (capacityControl && levelControl && progressControl) {
      this.updatedClass.capacity = capacityControl.value;
      this.updatedClass.level = levelControl.value;
      this.updatedClass.progress = progressControl.value;
  
      const classid = this.updatedClass.idClass;
  
      this.classService.updateClass(classid, this.updatedClass).subscribe(
        (response) => {
          console.log('Class updated successfully:', response);
  
          // Assuming your service returns the updated class details, update the local variable.
          this.updatedClass = response;
  
          console.log('After Update - Updated Class:', this.updatedClass);
  
          this.router.navigate(['/classe']);
        },
        (error) => {
          console.error('Error updating class:', error);
        }
      );
    } else {
      console.error('Form controls are null.');
    }
  }

  deleteClass(idClass: string | undefined): void {
    if (idClass) {
      this.classService.deleteClass(idClass).subscribe(
        () => {
          console.log(`Class with ID ${idClass} deleted successfully.`);
          // Update the class list or perform any necessary actions
          this.refreshClassList(); // Reload the updated class list
        },
        (error) => {
          console.error('Error deleting class:', error);
          // Handle error scenarios
        }
      );
    } else {
      console.error('Class ID is undefined. Cannot delete.');
    }
  }

  refreshClassList(): void {
    // Here, you should fetch the updated list of classes from your service
    // and update the local variable 'classes'
    this.classService.getAll().subscribe(
      (updatedClasses: any[]) => {
        this.classes = updatedClasses;
      },
      (error) => {
        console.error('Error refreshing class list:', error);
        // Handle error scenarios
      }
    );
  
  
}

isFieldInvalid(field: string) {
  const control = this.updateForm.get(field);
  return control && control.touched && control.invalid;
}
  }
  

  

