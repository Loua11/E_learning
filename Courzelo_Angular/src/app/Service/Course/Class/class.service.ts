import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from 'src/app/models/Class/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallclass`);
  }
  addClass(data: Class): Observable<any> {
    return this.http.post(`${this.apiUrl}/addClass`, data);
  }

  deleteClass(idClass: string): Observable<void> {
    const url = `${this.apiUrl}/DeleteClasse/${idClass}`;
    return this.http.delete<void>(url);
  }

  updateClass(classid: any, updatedClass: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateclass/${classid}`, updatedClass);
  }
  retrieveClass(classid: string): Observable<Class> {
    const url = `${this.apiUrl}/retrieveClass/${classid}`;
    return this.http.get<Class>(url);
  }
}
