import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getTeacherSchedule(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        db: environment.odooDb,
        user_id: 'current'
      }
    };

    return this.http.post('/api/sessions', body, { headers }).pipe(
      map((response: any) => {
        if (response.error) {
          throw new Error(response.error);
        }
        return response.result || [];
      }),
      catchError(error => {
        console.error('Error fetching schedule:', error);
        return throwError(() => error);
      })
    );
  }
}