// services/absence.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AbsenceService {
  constructor(private http: HttpClient) {}

  // --- Utilitaire POST "JSON-RPC-like" (si vous en avez besoin pour d'autres routes) ---
  private makeRequest(route: string, params: any = {}): Observable<any> {
    const body = {
      jsonrpc: '2.0',
      method: 'call',
      params: { db: environment.odooDb, ...params }
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

    return this.http.post(route, body, { headers }).pipe(
      map((response: any) => {
        if (response?.error) throw new Error(response.error.message || response.error);
        return response.result ?? response;
      }),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => error);
      })
    );
  }

  /** --- NOUVEAU: classes de l'enseignant --- */
  getMyClasses(): Observable<Array<{id:number; name:string}>> {
    return this.http.get<Array<{id:number; name:string}>>('/api/enseignant/classes');
  }

 getStudentsByClass(classeId: number): Observable<any> {
  return this.http.get(`/api/classes/${classeId}/students`);
}



  /** Création unitaire (POST JSON) */
  createAbsence(absenceData: any): Observable<any> {
    const formattedData = this.formatAbsenceDates(absenceData);
    return this.makeRequest('/api/absences/create', formattedData);
  }

  /** Création multiple (POST JSON) */
  bulkCreateAbsences(absences: any[]): Observable<any> {
    const formattedAbsences = absences.map(a => this.formatAbsenceDates(a));
    return this.makeRequest('/api/absences/bulk_create', { absences: formattedAbsences });
  }

  getStudentAbsences(studentId: number): Observable<any> {
    return this.makeRequest('/api/absences/student', { student_id: studentId });
  }

  private formatAbsenceDates(absence: any): any {
    const formatted = { ...absence };
    if (formatted.heure_debut) formatted.heure_debut = this.formatDateForOdoo(formatted.heure_debut);
    if (formatted.heure_fin)   formatted.heure_fin   = this.formatDateForOdoo(formatted.heure_fin);
    return formatted;
    }
  private formatDateForOdoo(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }
}
