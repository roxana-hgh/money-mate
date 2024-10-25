// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, catchError, switchMap, throwError, of, forkJoin } from 'rxjs';
// import { environment } from '../../environments/environment';
// import { AuthService } from './auth.service';
// import { User } from '../models/user.model';

// interface FirestoreField {
//   stringValue?: string;
//   integerValue?: number;
//   booleanValue?: boolean;
//   // Add other Firestore data types as needed
// }

// interface FirestoreDocument {
//   [key: string]: FirestoreField;
// }

// const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`;

// @Injectable({
//   providedIn: 'root'
// })
// export class FirestoreService {

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   // Helper method to dynamically create headers
//   private createHeaders(token: string): HttpHeaders {
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   // Helper method to handle errors
//   private handleError(error: any): Observable<never> {
//     console.error('An error occurred:', error);
//     return throwError(error);
//   }

//   // Create a new document
//   createDocument(collection: string, data: any): Observable<any> {
//     return this.authService.user.pipe(
//       switchMap((user: User | null) => {
//         if (!user || !user.token) {
//           return throwError('No valid user or token found');
//         }
//         const headers = this.createHeaders(user.token);
//         const url = `${FIRESTORE_URL}/${collection}`;
//         return this.http.post(url, { fields: this.convertToFirestoreFormat(data) }, { headers })
//           .pipe(
//             catchError(this.handleError)
//           );
//       })
//     );
//   }

//   // Get documents from a collection
//   getDocuments(collection: string): Observable<any> {
//     return this.authService.user.pipe(
//       switchMap((user: User | null) => {
//         if (!user || !user.token) {
//           return throwError('No valid user or token found');
//         }
//         const headers = this.createHeaders(user.token);
//         const url = `${FIRESTORE_URL}/${collection}`;
//         return this.http.get(url, { headers })
//           .pipe(
//             catchError(this.handleError)
//           );
//       })
//     );
//   }

//   // Update a document
//   updateDocument(collection: string, documentId: string, data: any): Observable<any> {
//     return this.authService.user.pipe(
//       switchMap((user: User | null) => {
//         if (!user || !user.token) {
//           return throwError('No valid user or token found');
//         }
//         const headers = this.createHeaders(user.token);
//         const url = `${FIRESTORE_URL}/${collection}/${documentId}`;
//         return this.http.patch(url, { fields: this.convertToFirestoreFormat(data) }, { headers })
//           .pipe(
//             catchError(this.handleError)
//           );
//       })
//     );
//   }

//   // Delete a document
//   deleteDocument(collection: string, documentId: string): Observable<any> {
//     return this.authService.user.pipe(
//       switchMap((user: User | null) => {
//         if (!user || !user.token) {
//           return throwError('No valid user or token found');
//         }
//         const headers = this.createHeaders(user.token);
//         const url = `${FIRESTORE_URL}/${collection}/${documentId}`;
//         return this.http.delete(url, { headers })
//           .pipe(
//             catchError(this.handleError)
//           );
//       })
//     );
//   }

//   getDocumentWithSubcollections(collection: string, documentId: string): Observable<any> {
//     return this.authService.user.pipe(
//         switchMap((user: User | null) => {
//             if (!user || !user.token) {
//                 return throwError('No valid user or token found');
//             }
//             const headers = this.createHeaders(user.token);
//             const url = `${FIRESTORE_URL}/${collection}/${documentId}`;
//             return this.http.get(url, { headers }).pipe(
//                 switchMap((doc: any) => {
//                     const subcollections: Observable<any>[] = [];

//                     if (doc.fields) {
//                         for (const key in doc.fields) {
//                             if (doc.fields.hasOwnProperty(key)) {
//                                 const subcollectionPath = `${collection}/${documentId}/${key}`;
//                                 subcollections.push(this.getDocuments(subcollectionPath));
//                             }
//                         }
//                     }

//                     return subcollections.length ? forkJoin([of(doc), ...subcollections]) : of(doc);
//                 }),
//                 catchError(this.handleError)
//             );
//         })
//     );
// }

//   // Helper method to convert data to Firestore format
//   private convertToFirestoreFormat(data: any): FirestoreDocument {
//     const formattedData: FirestoreDocument = {};
//     for (const key in data) {
//       if (Object.prototype.hasOwnProperty.call(data, key)) {
//         const value = data[key];
//         if (typeof value === 'string') {
//           formattedData[key] = { stringValue: value };
//         } else if (typeof value === 'number') {
//           formattedData[key] = { integerValue: value };
//         } else if (typeof value === 'boolean') {
//           formattedData[key] = { booleanValue: value };
//         }
//         // Add more types as needed (e.g., timestamp, array, map)
//       }
//     }
//     return formattedData;
//   }
// }
