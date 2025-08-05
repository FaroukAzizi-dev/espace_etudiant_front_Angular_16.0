import { Injectable, signal, Signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, tap, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private dbName = 'db_pacu-6csq-3ta6';

  isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

    const session = localStorage.getItem('odoo_session');
    this.isAuthenticated.set(!!session);
  }

  login(credentials: { login: string, password: string }): Observable<any> {
    const loginUrl = '/web/session/authenticate';
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
      withCredentials: true
    };

    console.log('%c[AUTH] Login attempt initiated', 'color: #4CAF50; font-weight: bold');
    console.log('[AUTH] Request payload:', body);

    return this.http.post(loginUrl, body, options).pipe(
      tap((response: any) => {
        if (response?.result) {
          console.log('%c[AUTH] Login successful', 'color: #4CAF50; font-weight: bold', response);
          this.isAuthenticated.set(true);
          localStorage.setItem('odoo_session', JSON.stringify(response));
        } else {
          console.warn('%c[AUTH] Login failed - no result in response', 'color: #FF9800; font-weight: bold', response);
        }
      }),
      catchError(error => {
        console.error('%c[AUTH] Login error', 'color: #F44336; font-weight: bold', error);
        return this.handleError(error);
      })
    );
  }


  logout(): Observable<any> {
    console.log('%c[AUTH] Logout initiated', 'color: #2196F3; font-weight: bold');
    const logouturl = '/web/session/logout';

    return this.http.post(logouturl, {}, { withCredentials: true }).pipe(
      tap(() => {
        console.log('%c[AUTH] Logout successful', 'color: #2196F3; font-weight: bold');
        this.clearSession();
      }),
      catchError(err => {
        console.error('%c[AUTH] Logout API failed', 'color: #F44336; font-weight: bold', err);
        console.warn("Logout API failed, but session was cleared locally.");
        this.clearSession();
        return of(null);
      })
    );
  }

  clearSession(): void {
    this.isAuthenticated.set(false);
    localStorage.removeItem('odoo_session');
    // Clear all cookies (for your domain)
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
      console.error('%c[AUTH] Client-side error', 'color: #F44336; font-weight: bold', error.error);
    } else if (error.error?.error?.data?.message) {
      errorMessage = `Odoo error: ${error.error.error.data.message}`;
      console.error('%c[AUTH] Odoo server error', 'color: #F44336; font-weight: bold', error.error.error.data.message);
    } else {
      errorMessage = `HTTP error: ${error.status} - ${error.message}`;
      console.error('%c[AUTH] HTTP error', 'color: #F44336; font-weight: bold', error.status, error.message);
    }
    return throwError(() => new Error(errorMessage));
  }


  getSessionData(): any {
    const session = localStorage.getItem('odoo_session');
    return session ? JSON.parse(session) : null;
  }

  getUserName(): string {
    const session = this.getSessionData();
    return session?.result?.name || '';
  }

  getUserId(): number {
    const session = this.getSessionData();
    return session?.result?.uid || 0;
  }

  getUserEmail(): string {
    const session = this.getSessionData();
    return session?.result?.username || '';
  }

}
