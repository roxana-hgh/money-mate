import { Injectable, Injector } from '@angular/core';
import {
  AuthChangeEvent,
  AuthResponse,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

import { _User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null); // Use BehaviorSubject
   isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.Url,
      environment.supabase.Key
    );

    this.autoLogin();
    // Check if there's an existing session when the service initializes
    const session = this.supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (session) {
          this.user.next(session.user);
          this.isAuthenticatedSubject.next(true);
        }
      });
        this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        this.user.next(session.user);
        this.isAuthenticatedSubject.next(true);
      } else if (event === 'SIGNED_OUT') {
        this.user.next(null);
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  register(
    email: string,
    username: string,
    password: string
  ): Observable<AuthResponse> {
    const promise = this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return from(promise);
  }
  // Logout function
  logout(): Observable<any> {
    const promise = this.supabase.auth.signOut(); // Logs out the user
    return from(promise); // Return as an observable
  }

  autoLogin() {
    this.isAuthenticatedSubject.next(false);
  
    // Get session and add more logging
    this.supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (session) {
          console.log('Session retrieved:', session);
          this.user.next(session.user);
          this.isAuthenticatedSubject.next(true);
        } else {
          console.log('No session found');
          this.user.next(null);
          this.isAuthenticatedSubject.next(false);
        }
      })
      .catch((error) => {
        console.error('Error during auto-login:', error);
        this.user.next(null);
        this.isAuthenticatedSubject.next(false);
      });
  }

  // Optional: Expose the isAuthenticated observable
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // signup(email: string, password: string, name: string) {
  //   return this.http
  //     .post<AuthResponseData>(this.SignUprootURL, {
  //       email,
  //       password,
  //       returnSecureToken: true,
  //     })
  //     .pipe(
  //       catchError((errorRes) => {
  //         let errorMessage = 'An unknown error occurred!';
  //         if (!errorRes.error || !errorRes.error.error) {
  //           return throwError(errorMessage);
  //         }
  //         switch (errorRes.error.error.message) {
  //           case 'EMAIL_EXISTS':
  //             errorMessage = 'The email address is already in use by another account.';
  //             break;
  //           case 'OPERATION_NOT_ALLOWED':
  //             errorMessage = 'Password sign-in is disabled for this project.';
  //             break;
  //           case 'TOO_MANY_ATTEMPTS_TRY_LATER':
  //             errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
  //             break;
  //         }
  //         return throwError(errorMessage);
  //       }),
  //       tap((resData) => {
  //         this.handleSignupAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn,

  //           this.saveUserData.bind(this), // Bind the saveUserData method
  //         name // Pass the name parameter
  //         );

  //       })
  //     );
  // }

  // signIn(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(this.SignInrootURL, {
  //       email,
  //       password,
  //       returnSecureToken: true,
  //     })
  //     .pipe(
  //       catchError((errorRes) => {
  //         let errorMessage = 'An unknown error occurred!';
  //         if (!errorRes.error || !errorRes.error.error) {
  //           return throwError(errorMessage);
  //         }
  //         switch (errorRes.error.error.message) {
  //           case 'EMAIL_NOT_FOUND':
  //             errorMessage = 'There is no user record corresponding to this identifier.';
  //             break;
  //           case 'INVALID_PASSWORD':
  //             errorMessage = 'The password is invalid.';
  //             break;
  //           case 'USER_DISABLED':
  //             errorMessage = 'The user account has been disabled by an administrator.';
  //             break;
  //           default:
  //             errorMessage = 'An unknown error occurred!';
  //         }
  //         return throwError(errorMessage);
  //       }),
  //       tap((resData) => {
  //         this.handleSignInAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // private handleSignupAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number,
  //   callback: (userId: string, name: string) => void,
  //   name: string // Add the name parameter here
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   this.user.next(user);
  //   this.autoLogout(expiresIn * 1000)
  //   // Save token and user info in local storage for JWT
  //   localStorage.setItem('userData', JSON.stringify(user));
  //   localStorage.setItem('token', token);
  //   this.isAuthenticatedSubject.next(true);
  //   callback(userId, name);
  // }

  // private handleSignInAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   this.user.next(user);
  //   this.autoLogout(expiresIn * 1000)

  //   // Save token and user info in local storage for JWT
  //   localStorage.setItem('userData', JSON.stringify(user));
  //   localStorage.setItem('token', token);
  //   this.isAuthenticatedSubject.next(true);

  // }
  // private saveUserData(userId: string, name: string) {
  //   const firestore = this.injector.get(FirestoreService)
  //   firestore.createDocument("users", {userId : userId, name: name}).subscribe(
  //     (res) => {
  //       console.log("Document created successfully:", res);
  //     },
  //     (error) => {
  //       console.error("Error creating document:", error);
  //       return throwError("An unknown error occurred!");
  //     }

  // )
  // }

  // isAuthenticated(): Observable<boolean> {
  //   return this.isAuthenticatedSubject.asObservable();
  // }

  // autoLogin() {
  //   const userDataString = localStorage.getItem('userData');
  //   if (!userDataString) {
  //     this.isAuthenticatedSubject.next(false);
  //     return;
  //   }

  //   try {
  //     const userData: {
  //       email: string;
  //       id: string;
  //       _token: string;
  //       _tokenExpirationDate: string;
  //     } = JSON.parse(userDataString);

  //     const loadedUser = new User(
  //       userData.email,
  //       userData.id,
  //       userData._token,
  //       new Date(userData._tokenExpirationDate)
  //     );

  //     if (loadedUser.token) {
  //       this.user.next(loadedUser);
  //       this.isAuthenticatedSubject.next(true);
  //       const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
  //       this.autoLogout(expirationDate)
  //     } else {
  //       this.isAuthenticatedSubject.next(false);
  //     }
  //   } catch (error) {
  //     console.error('Failed to parse user data from local storage:', error);
  //     this.isAuthenticatedSubject.next(false);
  //   }
  // }

  // logout() {
  //   this.user.next(null);
  //   this.isAuthenticatedSubject.next(false);
  //   localStorage.removeItem('userData');
  //   localStorage.removeItem('token');
  //   if(this.tokenExpirationTimer){
  //     clearTimeout(this.tokenExpirationTimer)
  //   }
  //   this.tokenExpirationTimer = null
  // }

  // autoLogout(expirationDuration: number){
  //   this.tokenExpirationTimer = setTimeout(() => {
  //     this.logout()
  //   }, expirationDuration)

  // }
}
