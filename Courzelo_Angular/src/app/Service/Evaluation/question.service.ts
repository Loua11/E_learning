import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/Evaluation/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:6085';

  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/retrievequestions`);
  }

  addQuestion(question: Question): Observable<any> {
    return this.http.post(`${this.apiUrl}/addQuestion`, question);
  }

  deleteQuestion(id: string): Observable<void> {
    const url = `${this.apiUrl}/DeleteQuestion/${id}`;
    return this.http.delete<void>(url);
  }
  retrieveQuestion(idquestion: string): Observable<Question> {
    const url = `${this.apiUrl}/retrieveQuestion/${idquestion}`;
    return this.http.get<Question>(url);
  }

  updateQuestion(idquestion: any,updatedQuestion: any): Observable<any> {
   return this.http.put(`${this.apiUrl}/updateQuestion/${idquestion}`,updatedQuestion);

  }
   evalQuiz(quizId: string,questions:any)
  {
    return this.http.post(`${this.apiUrl}/eval-quiz/${quizId}`,questions);
  }
  getQuestionsOfQuiz(qid:any)

  {
    return this.http.get(`${this.apiUrl}/question/quiz/${qid}`);

  }

}
