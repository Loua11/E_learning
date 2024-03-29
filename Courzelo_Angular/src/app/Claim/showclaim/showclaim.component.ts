import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaimService } from 'src/app/Service/Claim/claim.service';

@Component({
  selector: 'app-showclaim',
  templateUrl: './showclaim.component.html',
  styleUrls: ['./showclaim.component.css']
})
export class ShowclaimComponent {
  claimDetails: any;

  constructor(private claimService: ClaimService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idClaim = params.get('id');
      if (idClaim !== null) {
        this.claimService.retrieveidClaim(idClaim).subscribe(
          (clDetails: any) => {
            this.claimDetails = clDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
