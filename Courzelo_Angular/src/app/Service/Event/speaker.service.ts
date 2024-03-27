import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Speaker } from 'src/app/models/Event/speaker';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallspeakers`);}

    addSpeaker(data: Speaker): Observable<any> {
      return this.http.post(`${this.apiUrl}/addSpeaker`, data);
  }
  deleteSpeaker(idspeaker: string): Observable<void> {
    const url = `${this.apiUrl}/deleteSpeaker/${idspeaker}`;
    return this.http.delete<void>(url);
  }
  retrieveSpeaker(idspeaker: string): Observable<Speaker> {
    const url = `${this.apiUrl}/retrieveSpeaker/${idspeaker}`;
    return this.http.get<Speaker>(url);
  }
  updateSpeaker(idspeaker: any, updatedSpeaker: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateSpeaker/${idspeaker}`, updatedSpeaker);
  }


}
