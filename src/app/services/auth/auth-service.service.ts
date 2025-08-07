import { Injectable, signal, Signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, tap, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private dbName = 'db_pacu-6csq-3ta6'; // Fallback if environment not set
  
  // Combined signals for both authentication states
  isAuthenticated = signal<boolean>(false);
  private userData = signal<any>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize authentication state from both storage methods
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    // Check both storage methods for backward compatibility
    const odooSession = localStorage.getItem('odoo_session');
    const odooUser = localStorage.getItem('odoo_user');
    
    if (odooSession) {
      const sessionData = JSON.parse(odooSession);
      this.isAuthenticated.set(true);
      this.userData.set(sessionData.result || sessionData);
    } else if (odooUser) {
      const userData = JSON.parse(odooUser);
      this.isAuthenticated.set(true);
      this.userData.set(userData);
    } else {
      this.isAuthenticated.set(false);
      this.userData.set(null);
    }
  }

  login(credentials: { login: string, password: string }): Observable<any> {
    // Use environment config if available, fallback to hardcoded
    const loginUrl = environment?.odooApiUrl || '/web/session/authenticate';
    const database = environment?.odooDb || this.dbName;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const body = {
      jsonrpc: "2.0",
      params: {
        db: database,
        login: credentials.login,
        password: credentials.password
      }
    };

    const options = {
      headers: headers,
      withCredentials: true // Keep this for session-based auth
    };

    console.log('%c[AUTH] Login attempt initiated', 'color: #4CAF50; font-weight: bold');
    console.log('[AUTH] Request payload:', body);

    return this.http.post(loginUrl, body, options).pipe(
      tap((response: any) => {
        if (response?.result?.uid || response?.result) {
          console.log('%c[AUTH] Login successful', 'color: #4CAF50; font-weight: bold', response);
          this.isAuthenticated.set(true);
          
          // Store in both formats for compatibility
          const userData = response.result;
          this.userData.set(userData);
          
          // Store session data (original format)
          localStorage.setItem('odoo_session', JSON.stringify(response));
          // Store user data (new format)
          localStorage.setItem('odoo_user', JSON.stringify(userData));
        } else {
          console.warn('%c[AUTH] Login failed - no result in response', 'color: #FF9800; font-weight: bold', response);
          if (response?.error?.message) {
            throw new Error(response.error.message);
          } else {
            throw new Error('Authentification échouée');
          }
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
    const logoutUrl = '/web/session/logout';

    return this.http.post(logoutUrl, {}, { withCredentials: true }).pipe(
      tap(() => {
        console.log('%c[AUTH] Logout successful', 'color: #2196F3; font-weight: bold');
        this.clearSession();
        this.router.navigate(['/login']);
      }),
      catchError(err => {
        console.error('%c[AUTH] Logout API failed', 'color: #F44336; font-weight: bold', err);
        console.warn("Logout API failed, but session was cleared locally.");
        this.clearSession();
        this.router.navigate(['/login']);
        return of(null);
      })
    );
  }

  clearSession(): void {
    this.isAuthenticated.set(false);
    this.userData.set(null);
    
    // Clear both storage methods
    localStorage.removeItem('odoo_session');
    localStorage.removeItem('odoo_user');
    
    // Clear all cookies (for your domain)
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated() || !!localStorage.getItem('odoo_session') || !!localStorage.getItem('odoo_user');
  }

  // Original methods for backward compatibility
  getSessionData(): any {
    const session = localStorage.getItem('odoo_session');
    return session ? JSON.parse(session) : null;
  }

  getUserName(): string {
    const user = this.getCurrentUser();
    const session = this.getSessionData();
    return user?.name || session?.result?.name || '';
  }

  getUserId(): number {
    const user = this.getCurrentUser();
    const session = this.getSessionData();
    return user?.uid || session?.result?.uid || 0;
  }

  getUserEmail(): string {
    const user = this.getCurrentUser();
    const session = this.getSessionData();
    return user?.username || user?.email || session?.result?.username || '';
  }

  // New methods from second implementation
  getCurrentUser(): any {
    const userData = this.userData();
    if (userData) return userData;
    
    // Fallback to localStorage
    const odooUser = localStorage.getItem('odoo_user');
    const odooSession = localStorage.getItem('odoo_session');
    
    if (odooUser) {
      return JSON.parse(odooUser);
    } else if (odooSession) {
      const session = JSON.parse(odooSession);
      return session.result || session;
    }
    
    return {};
  }

  getUserRole(): string {
    const user = this.getCurrentUser();
    return user?.role || 'student';
  }

  getProfileImage(): string {
    const user = this.getCurrentUser();
    return user?.image || '/assets/images/default-avatar.png';
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
      console.error('%c[AUTH] Client-side error', 'color: #F44336; font-weight: bold', error.error);
    } else if (error.error?.error?.data?.message) {
      errorMessage = `Odoo error: ${error.error.error.data.message}`;
      console.error('%c[AUTH] Odoo server error', 'color: #F44336; font-weight: bold', error.error.error.data.message);
    } else if (error.error?.message) {
      errorMessage = `Error: ${error.error.message}`;
      console.error('%c[AUTH] Server error', 'color: #F44336; font-weight: bold', error.error.message);
    } else {
      errorMessage = `HTTP error: ${error.status} - ${error.message}`;
      console.error('%c[AUTH] HTTP error', 'color: #F44336; font-weight: bold', error.status, error.message);
    }
    return throwError(() => new Error(errorMessage));
  }
}