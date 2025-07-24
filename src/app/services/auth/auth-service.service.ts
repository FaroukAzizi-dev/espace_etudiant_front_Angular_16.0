import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs'; // Add this import

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private dbName = 'db_pacu-6csq-3ta6'; // Your Odoo DB name
  private isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router) { }


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
      withCredentials: true  // Keep session cookie automatically
    };


    return this.http.post(loginUrl, body, options).pipe(
      tap((response: any) => {
        console.log('Authentication successful:', response);
        if (response?.result) {
          this.isAuthenticated.set(true);
          localStorage.setItem('odoo_session', JSON.stringify(response));
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    const logouturl = 'http://localhost:8070/web/session/logout';

    this.isAuthenticated.set(false);
    localStorage.removeItem('odoo_session');

    this.router.navigate(['/login']); // Immediate redirect (optimistic logout)

    return this.http.post(logouturl, {}, { withCredentials: true }).pipe(
      catchError(err => {
        console.warn("Logout API failed, but session was cleared locally.", err);
        return of(null); // Now 'of' is properly imported
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated() || !!localStorage.getItem('odoo_session');
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
