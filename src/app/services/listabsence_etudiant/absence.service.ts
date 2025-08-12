import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


interface Absence {
  id: number;
  etudiant: string;
  enseignant: string | null;
  heure_debut: string;
  heure_fin: string | null;
  statut: string;
  motif: string;
}

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = `/api/student/absences/list`;

  constructor(private http: HttpClient) {}

  getAbsences(): Observable<{absences: Absence[]}> {
      
    return this.http.get<{absences: Absence[]}>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Une erreur est survenue lors de la récupération des absences'));
  }
}