import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClaimService } from 'src/app/Service/Claim/claim.service';
import { EventService } from 'src/app/Service/Event/event.service';
import { Category, Event } from 'src/app/models/Event/event';

@Component({
  selector: 'app-add-class',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  category = Object.values(Category);
  event!:Event;
  uploadedFileUrl!: string;
  fileType!: string;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      maxcapacity: ['', Validators.required],
      duration: ['', Validators.required],
      debutdate: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      photo: ['']
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileType = this.getFileType(file);
    this.uploadedFileUrl = URL.createObjectURL(file);

    // Récupérez le titre depuis le formulaire
    const title = this.eventForm.get('title')?.value;

    // Appel au service d'upload pour envoyer le fichier au backend
    this.eventService.uploadFile(file, title).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        // Mettez à jour votre modèle avec les données renvoyées par le backend si nécessaire
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  getFileType(file: File): string {
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.gif')) {
      return 'image';
    } else if (fileName.endsWith('.mp4') || fileName.endsWith('.avi')) {
      return 'video';
    } else if (fileName.endsWith('.pdf') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
      return 'document';
    } else {
      return 'other';
    }
  }

  goToList() {
    this.router.navigate(['/allevents']); // Replace '/allevents' with the URL of your event list
  }

  isFieldInvalid(field: string) {
    const control = this.eventForm.get(field);
    return control && control.touched && control.invalid;
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const newEvent: Event = {
        title: this.eventForm.get('title')?.value,
        maxcapacity: this.eventForm.get('maxcapacity')?.value,
        duration: this.eventForm.get('duration')?.value,
        debutdate: this.eventForm.get('debutdate')?.value,
        price: this.eventForm.get('price')?.value,
        category: this.eventForm.get('category')?.value
      };

      if (newEvent.title !== null && newEvent.maxcapacity !== null && newEvent.duration !== null && newEvent.debutdate !== null && newEvent.price !== null && newEvent.category !== null) {
        // Add the photo to the new event

        this.eventService.addEvent(newEvent).subscribe(
          () => {
            console.log('Event added successfully!');
            this.router.navigate(['/allevents']);
          },
          (error) => {
            console.error('Error adding event', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add event.');
      }
    } else {
      console.log('Form is invalid. Cannot add event.');
    }
  }
}