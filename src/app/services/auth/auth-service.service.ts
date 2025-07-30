import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAuthenticated = signal<boolean>(false);
  private userData = signal<any>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: { login: string, password: string }): Observable<any> {
    const body = {
      jsonrpc: "2.0",
      params: {
        db: environment.odooDb,
        login: credentials.login,
        password: credentials.password
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(environment.odooApiUrl, body, { headers }).pipe(
      tap((response: any) => {
        if (response?.result?.uid) {
          console.log('Réponse complète du serveur:', response);
          this.isAuthenticated.set(true);
          this.userData.set(response.result);
          localStorage.setItem('odoo_user', JSON.stringify(response.result));
        } else {
          throw new Error(response.error?.message || 'Authentification échouée');
        }
      }),
      catchError(error => {
        console.error('Erreur complète:', error);
        return throwError(() => error);
      })
    );
  }

  getUserRole(): string {
    const user = this.getCurrentUser();
    console.log('Données utilisateur pour rôle:', user);

    // Utilise directement le champ 'role' du contrôleur Odoo
    return user.role || 'student';
  }

  logout(): void {
    this.isAuthenticated.set(false);
    this.userData.set(null);
    localStorage.removeItem('odoo_user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated() || !!localStorage.getItem('odoo_user');
  }

  getCurrentUser() {
    return this.userData() || JSON.parse(localStorage.getItem('odoo_user') || '{}');
  }
}