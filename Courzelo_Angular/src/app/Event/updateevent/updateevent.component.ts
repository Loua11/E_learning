import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/Service/Event/event.service';
import { Category, Event } from 'src/app/models/Event/event';

@Component({
  selector: 'app-updateevent',
  templateUrl: './updateevent.component.html',
  styleUrls: ['./updateevent.component.css']
})
export class UpdateeventComponent {
  updateForm: FormGroup;
  selectedFile: File | undefined;
  categories: string[] = ['CONFERENCE', 'TEAM_BUILDING_ACTIVITIES', 'COURSE_LAUNCH', 'VIRTUEL_TRAINING_SESSION', 'HACKATHON', 'VIRTUEL_RECRUITING_EVENT'];


  updatedEvent: Event = {
    title: '',
    photo: '',
    maxcapacity: 0,
    duration: '',
    debutdate: new Date(),
    price: false,
    category: Category.CONFERENCE
  };
  
  
  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      photo: [''],
      maxcapacity: [0, Validators.required],
      duration: ['', Validators.required],
      debutdate: [null, Validators.required],
      price: [false, Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('id');
      if (eventId !== null) {
        this.eventService.retrieveEvent(eventId).subscribe(
          (eventDetails: Event) => {
            this.updatedEvent = eventDetails;
            this.updateForm.patchValue(eventDetails); // Mettez à jour le formulaire avec les détails de l'événement
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
  isFieldInvalid(field: string) {
    const control = this.updateForm.get(field);
    return control && control.touched && control.invalid;
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  updateEvent() {
    const titleControl = this.updateForm.get('title');
    const photoControl = this.updateForm.get('photo');
    const maxcapacityControl = this.updateForm.get('maxcapacity');
    const durationControl = this.updateForm.get('duration');
    const debutdateControl = this.updateForm.get('debutdate');
    const priceControl = this.updateForm.get('price');
    const categoryControl = this.updateForm.get('category');

    if (titleControl && photoControl && maxcapacityControl && debutdateControl && priceControl && categoryControl) {
      this.updatedEvent.title = titleControl.value;
      this.updatedEvent.photo = photoControl.value;
      this.updatedEvent.maxcapacity = maxcapacityControl.value;
      this.updatedEvent.debutdate = debutdateControl.value;
      this.updatedEvent.price = priceControl.value;
      this.updatedEvent.category = categoryControl.value;

      const eventId = this.updatedEvent.idevent; // Utilisez la propriété correcte pour l'identifiant de l'événement

      if (eventId) { // Vérifiez si eventId est défini avant de continuer
        this.eventService.updateEvent(eventId, this.updatedEvent).subscribe(
          response => {
            console.log('Event updated successfully:', response);

            // Assuming your service returns the updated event details, update the local variable.
            this.updatedEvent = response;

            this.router.navigate(['/allevents']);
          },
          error => {
            console.error('Error updating event:', error);
          }
        );
      } else {
        console.error('Event ID is undefined. Cannot update.');
      }
    } else {
      console.error('Form controls are null.');
    }
  }

}
