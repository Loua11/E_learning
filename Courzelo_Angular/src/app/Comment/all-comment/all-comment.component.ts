import { Component } from '@angular/core';
import { CommentService } from 'src/app/Service/Forum/Comment/comment.service';
import { Comment } from 'src/app/models/Comment/Comment';

@Component({
  selector: 'app-all-comment',
  templateUrl: './all-comment.component.html',
  styleUrls: ['./all-comment.component.css']
})
export class AllCommentComponent {
  comment?: any[] =[];
  currentComment?: Comment;
  currentIndex = -1;
  constructor(private commentService: CommentService) { }
  ngOnInit(): void {
    this.retrieveAllComment();
  }
  setActiveComment(c: Comment, index: number): void {
    this.currentComment = c;
    this.currentIndex = index;
  }
  retrieveAllComment(): void {
    this.commentService.getAll()
      .subscribe(
        (data: Comment[]) => {
          this.comment = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
         
        
  }

  deleteComment(idComment: string | undefined): void {
    if (idComment) {
      this.commentService.deleteComment(idComment).subscribe(
        () => {
          console.log(`Comment with ID ${idComment} deleted successfully.`);
          // Update the class list or perform any necessary actions
          this.refreshClassList(); // Reload the updated class list
        },
        (error) => {
          console.error('Error deleting Comment:', error);
          // Handle error scenarios
        }
      );
    } else {
      console.error('Comment ID is undefined. Cannot delete.');
    }
  }

  refreshClassList(): void {
    // Here, you should fetch the updated list of classes from your service
    // and update the local variable 'classes'
    this.commentService.getAll().subscribe(
      (updatedClasses: any[]) => {
        this.comment = updatedClasses;
      },
      (error) => {
        console.error('Error refreshing class list:', error);
        // Handle error scenarios
      }
    );
  
  
}
        
  }
   

