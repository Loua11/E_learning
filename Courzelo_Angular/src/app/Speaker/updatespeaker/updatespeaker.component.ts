import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeakerService } from 'src/app/Service/Event/speaker.service';
import { Speaker } from 'src/app/models/Event/speaker';

@Component({
  selector: 'app-update-speaker',
  templateUrl: './updatespeaker.component.html',
  styleUrls: ['./updatespeaker.component.css']
})
export class UpdatespeakerComponent implements OnInit {
  updateForm: FormGroup;
  updatedSpeaker: Speaker = { name: '', bio: '', title: '' };

  constructor(
    private fb: FormBuilder,
    private speakerService: SpeakerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      bio: ['', Validators.required],
      title: ['', Validators.required]
    });
  }
  isFieldInvalid(field: string) {
    const control = this.updateForm.get(field);
    return control && control.touched && control.invalid;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idspeaker = params.get('id');
      if (idspeaker !== null) {
        this.speakerService.retrieveSpeaker(idspeaker).subscribe(
          (speakerDetails: Speaker) => {
            this.updatedSpeaker = speakerDetails;
            this.updateForm.patchValue(speakerDetails); // Populate the form with speaker details
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

  updateSpeaker() {
    const nameControl = this.updateForm.get('name');
    const bioControl = this.updateForm.get('bio');
    const titleControl = this.updateForm.get('title');

    if (nameControl && bioControl && titleControl) {
      this.updatedSpeaker.name = nameControl.value;
      this.updatedSpeaker.bio = bioControl.value;
      this.updatedSpeaker.title = titleControl.value;

      const idspeaker = this.updatedSpeaker.idspeaker; // Use the correct property name for the speaker ID

      this.speakerService.updateSpeaker(idspeaker, this.updatedSpeaker).subscribe(
        response => {
          console.log('Speaker updated successfully:', response);

          // Assuming your service returns the updated speaker details, update the local variable.
          this.updatedSpeaker = response;

          this.router.navigate(['/allspeakers']);
        },
        error => {
          console.error('Error updating speaker:', error);
        }
      );
    } else {
      console.error('Form controls are null.');
    }
  }
}