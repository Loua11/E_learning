import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Event } from 'src/app/models/Event/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallevents`).pipe(
      catchError((error: any) => {
        console.error('Error retrieving events:', error);
        throw error; // Renvoie l'erreur pour qu'elle soit gérée par le composant appelant
      })
    );
  }
  
    
    addEvent(data: Event): Observable<any> {
      return this.http.post(`${this.apiUrl}/addEvent`, data);
  }
  deleteEvent(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/deleteEvent/${id}`);
}

updateEvent(idevent: string, eventData: any): Observable<Event> {
  const url = `${this.apiUrl}/updateEvent/${idevent}`;
  return this.http.put<Event>(url, eventData);
}
retrieveEvent(idevent: string): Observable<Event> {
  const url = `${this.apiUrl}/retrieveEvent/${idevent}`;
  return this.http.get<Event>(url);
}
uploadEventPhoto(file:File): Observable<HttpEvent<any>> {
  const formData: FormData = new FormData();

  formData.append('file', file);

  const req = new HttpRequest('POST', `${this.apiUrl}/uploadPhoto`, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}
getEventPhoto(eventId: string): Observable<any> {
  return this.http.get(`/api/event/${eventId}/photo`, { responseType: 'text' });
}
}
