import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Claim } from 'src/app/models/Claim/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }


  addClaim(data: Claim): Observable<any> {
    return this.http.post(`${this.apiUrl}/addClaim`, data);
  }


  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallClaims`);
  }
  deleteClaim(idclaim: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteClaim/${idclaim}`);
  }


  updateClaim(idClaim: any, updatedClaim: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateClaim/${idClaim}`, updatedClaim);
  }
  retrieveidClaim(idClaim: string): Observable<Claim> {
    const url = `${this.apiUrl}/retrieveidClaim/${idClaim}`;
    return this.http.get<Claim>(url);
  }
}
