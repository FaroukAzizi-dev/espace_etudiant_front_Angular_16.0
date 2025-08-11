// reclamation.service.ts - VERSION CORRIGÉE
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError, BehaviorSubject } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';

export interface Reclamation {
  id: number;
  titre: string;
  description: string;
  etat: string;
  date_creation: string;
  reponse_admin: string;
  date_traitement: string;
  admin: string;
  nom_fichier?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = '/web/api/etudiant/reclamations';
  
  // ✅ BehaviorSubject pour notifier les changements
  private reclamationsSubject = new BehaviorSubject<Reclamation[]>([]);
  public reclamations$ = this.reclamationsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private AuthService: AuthServiceService
  ) {
    console.log('ReclamationService initialized with API URL:', this.apiUrl);
  }

  // ✅ Méthode pour obtenir le token CSRF
  private getCsrfToken(): Observable<string> {
    return this.http.get('/web/etudiant/reclamations', {
      withCredentials: true
    }).pipe(
      tap((response: any) => {
        console.log('CSRF Token obtained:', response.csrf_token);
      }),
      catchError(this.handleError)
    );
  }

  createReclamation(titre: string, description: string, pieceJointe?: File): Observable<any> {
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);

    if (pieceJointe) {
      formData.append('piece_jointe', pieceJointe);
      formData.append('nom_fichier', pieceJointe.name);
    }

    const url = `${this.apiUrl}/create`;
    console.log('POSTing to:', url);

    return this.http.post(url, formData, {
      withCredentials: true,
      headers: new HttpHeaders({
        // Le navigateur ajoutera automatiquement le CSRF token
      })
    }).pipe(
      tap({
        next: (response) => {
          console.log('POST reclamation success:', response);
          // ✅ Recharger les réclamations après création
          this.loadReclamations().subscribe();
        },
        error: (err) => {
          console.error('POST reclamation error:', err);
        }
      }),
      catchError(this.handleError)
    );
  }

  getReclamations(): Observable<Reclamation[]> {
    console.log('[HTTP] Préparation de la requête GET vers:', this.apiUrl);
    
    return this.http.get<Reclamation[]>(this.apiUrl, {
        withCredentials: true,
        headers: new HttpHeaders({
            'Accept': 'application/json'
        })
    }).pipe(
        tap({
            next: (data) => {
                console.groupCollapsed('[HTTP] Réponse réussie - Détails des réclamations');
                console.log('URL:', this.apiUrl);
                console.log('Nombre de réclamations:', data.length);
                console.log('Contenu complet:', data);
                console.groupEnd();
            },
            error: (err) => {
                console.group('[HTTP] Erreur de requête');
                console.error('URL:', this.apiUrl);
                console.error('Statut:', err.status);
                console.error('Erreur complète:', err);
                console.groupEnd();
            }
        }),
        catchError(this.handleError)
    );
}

  // ✅ Nouvelle méthode pour forcer le rechargement
  loadReclamations(): Observable<Reclamation[]> {
    return this.getReclamations();
  }

  // ✅ Méthode pour rafraîchir depuis n'importe où
  refreshReclamations(): void {
    this.loadReclamations().subscribe({
      next: (data) => console.log('Réclamations rafraîchies:', data.length),
      error: (err) => console.error('Erreur refresh:', err)
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 401:
          errorMessage = 'Session expirée - Veuillez vous reconnecter';
          break;
        case 403:
          errorMessage = 'Accès refusé';
          break;
        case 404:
          errorMessage = 'Ressource non trouvée';
          break;
        case 500:
          errorMessage = 'Erreur serveur interne';
          break;
        default:
          errorMessage = `Erreur ${error.status}: ${error.message}`;
      }
    }
    
    console.error('API Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}