import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { EventService } from 'src/app/Service/Event/event.service';
import { Event } from 'src/app/models/Event/event';

@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit {
  events: Event[] = [];
  eventPhotos: { [key: string]: string } = {};


  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveAllEvents();  
    
  }
  

  retrieveAllEvents() {
    this.eventService.getAll().subscribe(
     ( data:Event[]) => {
        this.events = data;
        // Récupérer les photos pour chaque événement
        const photoRequests = this.events.map((event: any) =>
        this.eventService.getFileContent(event.photo)
      );

      forkJoin(photoRequests).subscribe(
        (photos: string[]) => {
          // Update each lesson with its corresponding content
          if (this.events) {
            this.events.forEach((events, index) => {
              // Check if 'contents' is not undefined
              if (photos && photos[index] !== undefined) {
                events.photo = photos[index];
              }
            });
          }
        },
      error => {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    );
     },
     (error) => {
      console.log(error);
    }
  );
  }
  
  


  deleteEvent(idevent: string | undefined): void {
    if (idevent) {
      this.eventService.deleteEvent(idevent).subscribe(
        () => {
          console.log(`Event with ID ${idevent} deleted successfully.`);
          // Actualiser la liste des événements après la suppression
          this.retrieveAllEvents();
        },
        (error) => {
          console.error("Error deleting event:", error);
        }
      );
    }
  }

 

  
}
