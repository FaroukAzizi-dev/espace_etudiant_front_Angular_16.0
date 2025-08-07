import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAuthenticated = signal<boolean>(false);
  private userData = signal<any>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('odoo_user');
    if (storedUser) {
      this.isAuthenticated.set(true);
      this.userData.set(JSON.parse(storedUser));
    }
  }

  login(credentials: { login: string; password: string }): Observable<any> {
    const loginUrl = '/web/session/authenticate';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      jsonrpc: '2.0',
      params: {
        db: environment.odooDb,
        login: credentials.login,
        password: credentials.password
      }
    };

    return this.http.post(loginUrl, body, { headers, withCredentials: true }).pipe(
      tap((response: any) => {
        if (response?.result?.uid) {
          console.log('[AUTH] Login successful:', response);
          this.isAuthenticated.set(true);
          this.userData.set(response.result);
          localStorage.setItem('odoo_user', JSON.stringify(response.result));
        } else {
          throw new Error(response.error?.message || 'Authentication failed');
        }
      }),
      catchError(error => this.handleError(error))
    );
  }

  logout(): Observable<any> {
    const logoutUrl = '/web/session/logout';
    return this.http.post(logoutUrl, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.clearSession();
      }),
      catchError(err => {
        console.error('[AUTH] Logout failed:', err);
        this.clearSession();
        return of(null);
      })
    );
  }

  clearSession(): void {
    this.isAuthenticated.set(false);
    this.userData.set(null);
    localStorage.removeItem('odoo_user');
    // Optional cookie cleanup for Odoo
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated() || !!localStorage.getItem('odoo_user');
  }

  getCurrentUser() {
    return this.userData() || JSON.parse(localStorage.getItem('odoo_user') || '{}');
  }

  getUserRole(): string {
    const user = this.getCurrentUser();
    return user.role || 'student';
  }

  getUserName(): string {
    return this.getCurrentUser()?.name || '';
  }

  getUserId(): number {
    return this.getCurrentUser()?.uid || 0;
  }

  getUserEmail(): string {
    return this.getCurrentUser()?.username || '';
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else if (error.error?.error?.data?.message) {
      errorMessage = `Odoo error: ${error.error.error.data.message}`;
    } else {
      errorMessage = `HTTP error: ${error.status} - ${error.message}`;
    }
    console.error('[AUTH] Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
