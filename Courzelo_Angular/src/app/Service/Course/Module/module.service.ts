import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from 'src/app/models/Module/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallModule`);
  }
  addModule(data: Module): Observable<any> {
    return this.http.post(`${this.apiUrl}/addModule`, data);
  }
  deleteModule(idModule: string): Observable<void> {
    const url = `${this.apiUrl}/DeleteModule/${idModule}`;
    return this.http.delete<void>(url);
  }

  updateModule(idModule: any, updateModule: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateModule/${idModule}`, updateModule);
  }
  retrieveModule(Moduleid: string): Observable<Module> {
    const url = `${this.apiUrl}/retrieveModule/${Moduleid}`;
    return this.http.get<Module>(url);
  }
 
}
