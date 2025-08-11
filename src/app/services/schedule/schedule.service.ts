import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  
  constructor(private http: HttpClient) {}

  getStudentSchedule(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json'
      // 'Content-Type' n'est généralement pas nécessaire pour les requêtes GET
    });

    console.log('[SCHEDULE] Making GET API call to /api/student-schedule');
    
    // Pour une requête GET, les paramètres doivent être passés dans l'URL
    return this.http.get('/api/student-schedule', { 
      headers,
      withCredentials: true 
    }).pipe(
      map((response: any) => {
        console.log('[SCHEDULE] Raw response:', response);
        
        if (response.error && response.error !== false) {
          throw new Error(response.error);
        }
        
        console.log('[SCHEDULE] Sessions from backend:', response.sessions);
        return response.sessions || [];
      }),
      catchError(error => {
        console.error('[SCHEDULE] Error fetching student schedule:', error);
        
        if (error.status === 404) {
          console.error('[SCHEDULE] API endpoint not found - check backend controller');
        } else if (error.status === 403) {
          console.error('[SCHEDULE] Authentication required');
        } else if (error.status === 405) {
          console.error('[SCHEDULE] Method not allowed - verify if endpoint accepts GET requests');
        }
        
        return throwError(() => error);
      })
    );
  }
}