import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/Service/Forum/Comment/comment.service';

@Component({
  selector: 'app-detail-comment',
  templateUrl: './detail-comment.component.html',
  styleUrls: ['./detail-comment.component.css']
})
export class DetailCommentComponent {
  commentDetails: any;

  constructor(private commentService: CommentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const commentid = params.get('id');
      if (commentid !== null) {
        this.commentService.retrieveComment(commentid).subscribe(
          (comDetails: any) => {
            this.commentDetails = comDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
