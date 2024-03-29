import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/Service/Forum/Comment/comment.service';
import { Comment } from 'src/app/models/Comment/Comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
  commentForm: FormGroup <any>;
  comment: any = { message: "", datecomment: "" }; 
  
 
  constructor(private fb:FormBuilder, private commService:CommentService, private route: ActivatedRoute, private router:Router){
    this.commentForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(3)]],
      datecomment: ['', Validators.required],
    });

  }
  ngOnInit(): void {}

  isFieldInvalid(field: string) {
    const control = this.commentForm.get(field);
    return control && control.touched && control.invalid;
  }
  onSubmit() {
    if (this.commentForm.valid) {
      const newComment: Comment = {
        message: this.commentForm.get('message')?.value,
        
        datecomment: this.commentForm.get('datecomment')?.value,
      };
      
  
      if (newComment.message !== null  && newComment.datecomment !== null) {
        this.commService.addComment(newComment).subscribe(
          () => {
            console.log('Course added successfully!');
            // Ajoutez ici la navigation ou d'autres actions après l'ajout réussi
            this.router.navigate(['/allComment']);
          },
          (error) => {
            console.error('Error adding Comment ', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add Comment.');
      }
    } else {
      console.log('Form is invalid. Cannot add Comment.');
    }
  }

}
