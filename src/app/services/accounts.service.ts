import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  
  baseUrl = 'https://vwgyfkcpejtqlyuyblqk.supabase.co/rest/v1/';
  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      apikey: environment.supabase.Key,
    });
  }

  // Helper method to handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  getAccounts(): Observable<any> {
   const token = localStorage.getItem('token');
    if (!token ) {
      return throwError('No valid user or token found');
    }else{
      return this.http
          .get(`${this.baseUrl}/accounts?select=*`, {
            headers: this.createHeaders(token),
          })
          .pipe(catchError(this.handleError));
    }
  
  }
}
