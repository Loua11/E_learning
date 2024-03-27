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
uploadFile(file: File, title: string): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);

  return this.http.post<any>(`${this.apiUrl}/uploadPhoto`, formData);
}

getFiles(): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/getFiles`);
}
getFilesWithInfo(): Observable<Event[]> {
  return this.http.get<Event[]>(`${this.apiUrl}/getFilesWithInfo`);
}
getFileContent(photo: string): Observable<any> {
  const url = `${this.apiUrl}/photo/${photo}`;
  return this.http.get(url, { responseType: 'arraybuffer' });
}
}
