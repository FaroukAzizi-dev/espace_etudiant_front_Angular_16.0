import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  constructor(private http: HttpClient) {}

  private makeRequest(route: string, params: any = {}): Observable<any> {
    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        db: environment.odooDb,
        ...params
      }
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(route, body, { headers }).pipe(
      map((response: any) => {
        if (response?.error) {
          throw new Error(response.error.message || response.error);
        }
        return response.result || response;
      }),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => error);
      })
    );
  }

  createAbsence(absenceData: any): Observable<any> {
    // Formatage des dates pour Odoo
    const formattedData = { ...absenceData };
    
    if (formattedData.heure_debut) {
      formattedData.heure_debut = this.formatDateForOdoo(formattedData.heure_debut);
    }
    
    if (formattedData.heure_fin) {
      formattedData.heure_fin = this.formatDateForOdoo(formattedData.heure_fin);
    }

    return this.makeRequest('/api/absences/create', formattedData);
  }

  private formatDateForOdoo(dateString: string): string {
    // Convertit le format datetime-local vers le format Odoo
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  getStudentAbsences(studentId: number): Observable<any> {
    return this.makeRequest('/api/absences/student', { student_id: studentId });
  }
}