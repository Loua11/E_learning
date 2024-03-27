import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimService } from 'src/app/Service/Claim/claim.service';
import { Claim, Status, TypeClaim } from 'src/app/models/Claim/claim';

@Component({
  selector: 'app-addclaim',
  templateUrl: './addclaim.component.html',
  styleUrls: ['./addclaim.component.css']
})
export class AddclaimComponent implements OnInit {
  
  claimForm: FormGroup;
  claim: any = { title: '', dateclaim: "",typeclaim: "",status :"" }; 
  status = Object.values(Status);
  typeclaim= Object.values(TypeClaim);
 
  constructor(private fb:FormBuilder, private claimService:ClaimService, private route: ActivatedRoute, private router:Router){
    this.claimForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      dateclaim: ['', Validators.required],
      typeclaim: ['', Validators.required],
      status: ['', Validators.required],
    });

  }
  ngOnInit(): void {}

 
  onSubmit() {
    if (this.claimForm.valid) {
      const newClaim: Claim = {
        title: this.claimForm.get('title')?.value,
        dateclaim: this.claimForm.get('dateclaim')?.value,
        typeclaim: this.claimForm.get('typeclaim')?.value,
        status: this.claimForm.get('status')?.value,
      };
  
      if (newClaim.title !== null && newClaim.dateclaim !== null && newClaim.typeclaim !== null && newClaim.status !== null) {
        this.claimService.addClaim(newClaim).subscribe(
          () => {
            console.log('Claim added successfully!');
            // Ajoutez ici la navigation ou d'autres actions après l'ajout réussi
            this.router.navigate(['/allclaims']);
          },
          (error) => {
            console.error('Error adding Claim', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add Claim.');
      }
    } else {
      console.log('Form is invalid. Cannot add Claim.');
    }
}
}
