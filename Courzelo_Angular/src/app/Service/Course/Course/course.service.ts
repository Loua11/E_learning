import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/Course/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallCourse`);
  }
  addCourse(data: Course): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCourse`, data);
  }
  deleteCourse(idCourse: string): Observable<void> {
    const url = `${this.apiUrl}/DeleteCourse/${idCourse}`;
    return this.http.delete<void>(url);
  }

  updateCourse(idCourse: any, updateCourse: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateCourse/${idCourse}`, updateCourse);
  }
  retrieveCourse(courseid: string): Observable<Course> {
    const url = `${this.apiUrl}/retrieveCourse/${courseid}`;
    return this.http.get<Course>(url);
  }
}
