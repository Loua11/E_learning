import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/Evaluation/question';
import { Quiz, QuizWithQuestionReferences } from 'src/app/models/Evaluation/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallquizzes`);}

    addQuiz(data: Quiz): Observable<any> {
      return this.http.post(`${this.apiUrl}/addQuiz`, data);
  }
 deleteQuiz(idquiz: string): Observable<void> {
    const url = `${this.apiUrl}/deleteQuiz/${idquiz}`;
    return this.http.delete<void>(url);}

    retrieveQuiz(idquiz: string): Observable<Quiz> {
      const url = `${this.apiUrl}/retrieveQuiz/${idquiz}`;
      return this.http.get<Quiz>(url);
    
  }
  updateQuiz(idquiz: any, updatedQuiz: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateQuiz/${idquiz}`, updatedQuiz);
  }

  addQuizWithQuestions(quiz: QuizWithQuestionReferences): Observable<any> {
    console.log('Quiz being sent to server:', quiz); // Add this line to log the quiz object
    return this.http.post(`${this.apiUrl}/add`, quiz);
  }
  
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/retrievequestions`);
  }
  }

