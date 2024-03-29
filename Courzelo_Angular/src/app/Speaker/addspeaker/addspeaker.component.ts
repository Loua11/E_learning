import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeakerService } from 'src/app/Service/Event/speaker.service';
import { Speaker } from 'src/app/models/Event/speaker';

@Component({
  selector: 'app-addspeaker',
  templateUrl: './addspeaker.component.html',
  styleUrls: ['./addspeaker.component.css']
})
export class AddspeakerComponent {
  speakerForm: FormGroup;
  speaker: any = { name: '', title: "",  bio: "" }; 
 
  constructor(private fb:FormBuilder, private speakerService:SpeakerService, private route: ActivatedRoute, private router:Router){
    this.speakerForm = this.fb.group({ 
      name: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      bio: ['', Validators.required],
   
    });

  }
  ngOnInit(): void {}

 
  onSubmit() {
    if (this.speakerForm.valid) {
      const newSpeaker: Speaker = {       
         name: this.speakerForm.get('name')?.value,
        title: this.speakerForm.get('title')?.value,
        bio: this.speakerForm.get('bio')?.value,
      }
      if (newSpeaker.name!== null && newSpeaker.title !== null && newSpeaker.bio !== null ){
        this.speakerService.addSpeaker(newSpeaker).subscribe(
          () => {
            console.log('Speaker added successfully!');
            this.router.navigate(['/allspeakers']);
          },
          (error) => {
            console.error('Error adding Speaker', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add Speaker.');
      }
    } else {
      console.log('Form is invalid. Cannot add Speaker.');
    }
  }
  isFieldInvalid(field: string) {
    const control = this.speakerForm.get(field);
    return control && control.touched && control.invalid;
  }

}
