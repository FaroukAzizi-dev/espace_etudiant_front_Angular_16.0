import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private dbName = 'db_pacu-6csq-3ta6'; // Your Odoo DB name

  constructor(private http: HttpClient) { }

  
  login(credentials: { login: string, password: string }): Observable<any> {
    const loginUrl = '/web/session/authenticate'; // Through proxy

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      jsonrpc: "2.0",
      params: {
        db: this.dbName,
        login: credentials.login,
        password: credentials.password
      }
    };

    const options = {
      headers: headers,
      withCredentials: true  // Keep session cookie
    };

    return this.http.post(loginUrl, body, options).pipe(
      tap(response => {
        console.log('Authentication successful:', response);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.error?.error?.data?.message) {
        errorMessage = `Error from Odoo: ${error.error.error.data.message}`;
      } else {
        errorMessage = `Server returned code: ${error.status}, message: ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
