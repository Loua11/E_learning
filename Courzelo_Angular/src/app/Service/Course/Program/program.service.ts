import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from 'src/app/models/Program/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallProgram`);
  }
  addProg(data: Program): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProgram`, data);
  }
 
  deleteProg(idprog: string): Observable<void> {
    const url = `${this.apiUrl}/DeleteProgram/${idprog}`;
    return this.http.delete<void>(url);
  }
  updateProgram(idprog: any, updateProgram: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateProgram/${idprog}`, updateProgram);
  }
  retrieveProgram(Programid: string): Observable<Program> {
    const url = `${this.apiUrl}/retrieveProgram/${Programid}`;
    return this.http.get<Program>(url);
  }

}
