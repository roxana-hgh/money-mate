import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastsService } from './toasts.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  
  baseUrl = 'https://vwgyfkcpejtqlyuyblqk.supabase.co/rest/v1';
  constructor(private http: HttpClient, private authService: AuthService, public toastService: ToastsService) {
    
  }

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'apikey': environment.supabase.Key,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    });
  }
  

  // Helper method to handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    this.toastService.show({message: "An error occurred"})
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

  getAccount(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token ) {
      return throwError('No valid user or token found');
    }else{
      return this.http
          .get(`${this.baseUrl}/accounts?id=eq.${id}&select=*`, {
            headers: this.createHeaders(token),
          })
          .pipe(catchError(this.handleError));
    }
  }

  addAccount(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token ) {
      return throwError('No valid user or token found');
    }else{
      return this.http
          .post(`${this.baseUrl}/accounts`, data, {
            headers: this.createHeaders(token),
          })
          .pipe(catchError(this.handleError));
    }
  }

  updateAccount(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
   
    if (!token ) {
      return throwError('No valid user or token found');
    }else{
      const headers = this.createHeaders(token);
      return this.http
          .patch(`${this.baseUrl}/accounts?id=eq.${id}`, data, { headers })
          .pipe(catchError(this.handleError));
    }
  }

  deleteAccount(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token ) {
      return throwError('No valid user or token found');
    }else{
      return this.http
          .delete(`${this.baseUrl}/accounts?id=eq.${id}`, {
            headers: this.createHeaders(token),
          })
          .pipe(catchError(this.handleError));
    }
  }
}
