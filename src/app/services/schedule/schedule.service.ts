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
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log('[SCHEDULE] Making API call to /api/student-schedule');
    
    // For Odoo JSON endpoints, we need to send a POST request with JSON data
    const requestData = {
      jsonrpc: "2.0",
      method: "call",
      params: {}
    };
    
    return this.http.post('/api/student-schedule', requestData, { 
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
          console.error('[SCHEDULE] API endpoint not found - check Odoo controller');
        } else if (error.status === 403) {
          console.error('[SCHEDULE] Authentication required');
        }
        
        return throwError(() => error);
      })
    );
  }
}