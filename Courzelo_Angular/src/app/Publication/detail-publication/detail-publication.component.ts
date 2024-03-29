import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from 'src/app/Service/Forum/Publication/publication.service';

@Component({
  selector: 'app-detail-publication',
  templateUrl: './detail-publication.component.html',
  styleUrls: ['./detail-publication.component.css']
})
export class DetailPublicationComponent {
  pubDetails: any;

  constructor(private pubService: PublicationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Publicationid = params.get('id');
      if (Publicationid !== null) {
        this.pubService.retrievePublication(Publicationid).subscribe(
          (publicationDetails: any) => {
            this.pubDetails = publicationDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}

