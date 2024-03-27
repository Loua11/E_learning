import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimService } from 'src/app/Service/Claim/claim.service';
import { Claim, Status, TypeClaim } from 'src/app/models/Claim/claim';

@Component({
  selector: 'app-updateclaim',
  templateUrl: './updateclaim.component.html',
  styleUrls: ['./updateclaim.component.css']
})
export class UpdateclaimComponent {

  updateForm: FormGroup;
  updatedClaim: any = { title: '', dateclaim: "",typeclaim: "",status :"" }; 
  status = Object.values(Status);
  typeclaim= Object.values(TypeClaim);

  claim?: Claim[] ;
  constructor(private fb: FormBuilder, private claimService: ClaimService, private route: ActivatedRoute,  private router:Router) {
    this.updateForm = this.fb.group({
     
      title: ['', Validators.required],
      dateclaim: ['', Validators.required],
      typeclaim: ['', Validators.required],
      status: ['', Validators.required],
   
      // Add more fields as needed
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idClaim = params.get('id');
      if (idClaim !== null) {
        this.claimService.retrieveidClaim(idClaim).subscribe(
        (clDetails: any) => {
          this.updatedClaim = clDetails;
          this.updatedClaim.datecomment = new Date(clDetails.dateclaim).toISOString().split('T')[0];
          this.updateForm.patchValue(clDetails); // Populate the form with class details
        },
        error => {
          console.log(error);
        }
      );
  }});
  }
  


  updateClaim() {
    console.log('Before Update - Updated Class:', this.updatedClaim);
  
    const title = this.updateForm.get('title');
    const dateclaim = this.updateForm.get('dateclaim');
    const typeclaim = this.updateForm.get('typeclaim');
    const status = this.updateForm.get('status');
   
  
    if (title && dateclaim && typeclaim && status) {
      this.updatedClaim.title = title.value;
      this.updatedClaim.dateclaim = dateclaim.value;
      this.updatedClaim.typeclaim = typeclaim.value;
      this.updatedClaim.status = status.value;
  
      const idClaim = this.updatedClaim.idClaim;
  
      this.claimService.updateClaim(idClaim, this.updatedClaim).subscribe(
        (response) => {
          console.log('Claim updated successfully:', response);
  
          // Assuming your service returns the updated class details, update the local variable.
          this.updatedClaim = response;
  
          console.log('After Update - Updated Claim:', this.updatedClaim);
  
          this.router.navigate(['/allclaims']);
        },
        (error) => {
          console.error('Error updating Claim:', error);
        }
      );
    } else {
      console.error('Form controls are null.');
    }
  }

}
