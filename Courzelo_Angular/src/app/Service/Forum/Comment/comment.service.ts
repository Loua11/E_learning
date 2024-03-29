import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/Comment/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }
  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallcomments`);
  }
  addComment(data: Comment): Observable<any> {
    return this.http.post(`${this.apiUrl}/addComment`, data);
  }
  deleteComment(idComment: string): Observable<void> {
    const url = `${this.apiUrl}/DeleteComment/${idComment}`;
    return this.http.delete<void>(url);
  }

  updateComment(idComment: any, updateComment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateComment/${idComment}`, updateComment);
  }
  retrieveComment(commentid: string): Observable<Comment> {
    const url = `${this.apiUrl}/retrieveComment/${commentid}`;
    return this.http.get<Comment>(url);
  }
}
