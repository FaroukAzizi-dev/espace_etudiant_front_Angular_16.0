import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = '/web/api/etudiant/reclamations';

  constructor(private http: HttpClient) { 
    console.log('ReclamationService initialized with API URL:', this.apiUrl);
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
      withCredentials: true 
    }).pipe(
      tap({
        next: (response) => console.log('POST reclamation success:', response),
        error: (err) => {
          console.error('POST reclamation error:', err);
          throw err;
        }
      })
    );
  }
}