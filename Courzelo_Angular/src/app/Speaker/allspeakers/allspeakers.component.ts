import { Component } from '@angular/core';
import { SpeakerService } from 'src/app/Service/Event/speaker.service';
import { Speaker } from 'src/app/models/Event/speaker';

@Component({
  selector: 'app-allspeakers',
  templateUrl: './allspeakers.component.html',
  styleUrls: ['./allspeakers.component.css']
})
export class AllspeakersComponent {
  speakers?: Speaker[] ;
  currentSpeaker?: Speaker;
  currentIndex = -1;
  constructor(private speakerserv: SpeakerService) { }
  ngOnInit(): void {
    this.retrieveallspeakers();
  }
  setActiveEvent(s: Speaker, index: number): void {
    this.currentSpeaker=s;
    this.currentIndex = index;
  }
  retrieveallspeakers(): void {
    this.speakerserv.getAll()
      .subscribe(
        data => {
          
          this.speakers = data ;
          console.log(data);
        },
        
        error => {
          console.log(error);});
        



  }

  deleteSpeaker(idspeaker: string | undefined): void {
    if (idspeaker) {
      this.speakerserv.deleteSpeaker(idspeaker).subscribe(
        () => {
          console.log(`Speaker with ID ${idspeaker} deleted successfully.`);
          this.retrieveallspeakers();
        },
        (error) => {
          console.error('Error deleting speaker:', error);
        }
      );
    } else {
      console.error('Speaker ID is undefined. Cannot delete.');
    }
  }
}

  
    

 
