import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/Service/Forum/Comment/comment.service';
import { Comment } from 'src/app/models/Comment/Comment';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.css']
})
export class UpdateCommentComponent {
  updateForm: FormGroup;
  updatedComment: any = { message: '', datecomment: '' };

  com?: Comment[] ;
  constructor(private fb: FormBuilder, private commentService: CommentService, private route: ActivatedRoute,  private router:Router) {
    this.updateForm = this.fb.group({
     
      message: ['', Validators.required],
      datecomment: ['', Validators.required],
   
      // Add more fields as needed
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const commentid = params.get('id');
      if (commentid !== null) {
        this.commentService.retrieveComment(commentid).subscribe(
        (comDetails: any) => {
          this.updatedComment = comDetails;
          this.updatedComment.datecomment = new Date(comDetails.datecomment).toISOString().split('T')[0];
          this.updateForm.patchValue(comDetails); // Populate the form with class details
        },
        error => {
          console.log(error);
        }
      );
  }});
  }
  


  updateComment() {
    console.log('Before Update - Updated Class:', this.updatedComment);
  
    const message = this.updateForm.get('message');
    const datecomment = this.updateForm.get('datecomment');
   
  
    if (message && datecomment ) {
      this.updatedComment.message = message.value;
      this.updatedComment.datecomment = datecomment.value;
   
  
      const commentid = this.updatedComment.idComment;
  
      this.commentService.updateComment(commentid, this.updatedComment).subscribe(
        (response) => {
          console.log('Comment updated successfully:', response);
  
          // Assuming your service returns the updated class details, update the local variable.
          this.updatedComment = response;
  
          console.log('After Update - Updated Comment:', this.updatedComment);
  
          this.router.navigate(['/allComment']);
        },
        (error) => {
          console.error('Error updating Comment:', error);
        }
      );
    } else {
      console.error('Form controls are null.');
    }
  }
  isFieldInvalid(field: string) {
    const control = this.updateForm.get(field);
    return control && control.touched && control.invalid;
  }
  
}
