import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/Service/Event/event.service';
import { Event } from 'src/app/models/Event/event';

@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit {
  events: Event[] = [];
  uploadPath: string = 'assets/uploads/';
  eventPhotos: { [key: string]: string } = {};
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveAllEvents();

  }

  selectFile(event:any): void{
    this.selectedFiles = event.target.files;

  }
  retrieveAllEvents() {
    this.eventService.getAll().subscribe(
      data => {
        this.events = data;
        // Récupérer les photos pour chaque événement
        this.events.forEach(event => {
          if (event && event.idevent && typeof event.idevent === 'string') {
            const idevent = event.idevent as string; // Assurez-vous que idevent est de type string
            // Vérifier si event et event.idevent sont définis et de type string
            this.eventService.getEventPhoto(idevent).subscribe(
              photoData => {
                this.eventPhotos[idevent] = 'data:image/png;base64,' + photoData;
              },
              error => {
                console.error(`Erreur lors du chargement de l'image pour l'événement ${event.idevent} :`, error);
              }
            );
          }
        });
      },
      error => {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    );
  }




  deleteEvent(idevent: string | undefined): void {
    if (idevent) {
      this.eventService.deleteEvent(idevent).subscribe(
        () => {
        //  console.log(`Event with ID ${idevent} deleted successfully.`);
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
