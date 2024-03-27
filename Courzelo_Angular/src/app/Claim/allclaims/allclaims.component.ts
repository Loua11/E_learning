import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClaimService } from 'src/app/Service/Claim/claim.service';
import { Claim, Status, TypeClaim } from 'src/app/models/Claim/claim';

@Component({
  selector: 'app-allclaims',
  templateUrl: './allclaims.component.html',
  styleUrls: ['./allclaims.component.css']
})
export class AllclaimsComponent implements OnInit {


  claim?: any[] =[];
  currentClaim?: Claim;
  currentIndex = -1;
  constructor(private claimService: ClaimService) { }
  ngOnInit(): void {
    this.retrieveAllClaim();
  }
  setActiveClaim(c: Claim, index: number): void {
    this.currentClaim = c;
    this.currentIndex = index;
  }
  retrieveAllClaim(): void {
    this.claimService.getAll()
      .subscribe(
        (data: Claim[]) => {
          this.claim = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
      }     
        deleteClaim(idclaim: string | undefined): void {
          if (idclaim) {
            this.claimService.deleteClaim(idclaim).subscribe(
              () => {
                console.log(`Claim with ID ${idclaim} deleted successfully.`);
                // Update the class list or perform any necessary actions
                this.refreshClassList(); // Reload the updated class list
              },
              (error) => {
                console.error('Error deleting Claim:', error);
                // Handle error scenarios
              }
            );
          } else {
            console.error('Claim ID is undefined. Cannot delete.');
          }
        }
      
        refreshClassList(): void {
          // Here, you should fetch the updated list of classes from your service
          // and update the local variable 'classes'
          this.claimService.getAll().subscribe(
            (updatedClaim: any[]) => {
              this.claim = updatedClaim;
            },
            (error) => {
              console.error('Error refreshing Claim list:', error);
              // Handle error scenarios
            }
          );
}
}
