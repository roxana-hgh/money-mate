import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FirestoreService } from './firestore.service';


interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private SignUprootURL =
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`;
  private SignInrootURL =
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;

    user = new BehaviorSubject<User | null>(null);  // Use BehaviorSubject
   
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    private tokenExpirationTimer :any;

  constructor(private http: HttpClient, private injector: Injector, private router: Router) {
    
  }

  signup(email: string, password: string, name: string) {
    return this.http
      .post<AuthResponseData>(this.SignUprootURL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'The email address is already in use by another account.';
              break;
            case 'OPERATION_NOT_ALLOWED':
              errorMessage = 'Password sign-in is disabled for this project.';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
              break;
          }
          return throwError(errorMessage);
        }),
        tap((resData) => {
          this.handleSignupAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
            
            this.saveUserData.bind(this), // Bind the saveUserData method
          name // Pass the name parameter
          );
          
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.SignInrootURL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'There is no user record corresponding to this identifier.';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'The password is invalid.';
              break;
            case 'USER_DISABLED':
              errorMessage = 'The user account has been disabled by an administrator.';
              break;
            default:
              errorMessage = 'An unknown error occurred!';
          }
          return throwError(errorMessage);
        }),
        tap((resData) => {
          this.handleSignInAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleSignupAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    callback: (userId: string, name: string) => void,
    name: string // Add the name parameter here
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    // Save token and user info in local storage for JWT
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
    callback(userId, name);
  }

  private handleSignInAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)

    // Save token and user info in local storage for JWT
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
   
  }
  private saveUserData(userId: string, name: string) {
    const firestore = this.injector.get(FirestoreService)
    firestore.createDocument("users", {userId : userId, name: name}).subscribe(
      (res) => {
        console.log("Document created successfully:", res);
      },
      (error) => {
        console.error("Error creating document:", error);
        return throwError("An unknown error occurred!"); 
      }
  
  )
  }



  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  autoLogin() {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      this.isAuthenticatedSubject.next(false);
      return;
    }
  
    try {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(userDataString);
  
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
  
      if (loadedUser.token) {
        this.user.next(loadedUser);
        this.isAuthenticatedSubject.next(true);
        const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
        this.autoLogout(expirationDate)
      } else {
        this.isAuthenticatedSubject.next(false);
      }
    } catch (error) {
      console.error('Failed to parse user data from local storage:', error);
      this.isAuthenticatedSubject.next(false);
    }
  }

  logout() {
    this.user.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)

  }


}

