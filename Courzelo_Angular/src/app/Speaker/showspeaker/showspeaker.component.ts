import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeakerService } from 'src/app/Service/Event/speaker.service';

@Component({
  selector: 'app-showspeaker',
  templateUrl: './showspeaker.component.html',
  styleUrls: ['./showspeaker.component.css']
})
export class ShowspeakerComponent {
  speakerDetails: any;

  constructor(private speakerService: SpeakerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idspeaker = params.get('id');
      if (idspeaker !== null) {
        this.speakerService.retrieveSpeaker(idspeaker).subscribe(
          (speakerDetails: any) => {
            this.speakerDetails = speakerDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

}
