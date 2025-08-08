import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  private makeRequest(route: string, params: any = {}): Observable<any> {
    const body = {
      jsonrpc: "2.0",
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
          throw new Error(response.error);
        }
        return response.result || response;
      }),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => error);
      })
    );
  }

  getTeacherSubjects(): Observable<any> {
    return this.makeRequest('/api/teacher/subjects');
  }

  getTeacherClasses(): Observable<any> {
    return this.makeRequest('/api/teacher/classes');
  }

  getSubjectDetails(subjectId: number): Observable<any> {
    return this.makeRequest('/api/subjects/details', { subject_id: subjectId });
  }

  getSubjectSchedule(subjectId: number): Observable<any> {
    return this.makeRequest('/api/subjects/schedule', { subject_id: subjectId });
  }
  getTeacherSchedule(): Observable<any> {
  return this.makeRequest('/api/teacher/schedule');
}
}