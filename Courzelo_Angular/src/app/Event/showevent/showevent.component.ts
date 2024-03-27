import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Service/Event/event.service';

@Component({
  selector: 'app-showevent',
  templateUrl: './showevent.component.html',
  styleUrls: ['./showevent.component.css']
})
export class ShoweventComponent {
  eventDetails: any;

  constructor(private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idevent = params.get('id');
      if (idevent !== null) {
        this.eventService.retrieveEvent(idevent).subscribe(
          (eventDetails: any) => {
            this.eventDetails = eventDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

}
