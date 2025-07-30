import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface Student {
  id: number;
  identifiant: string;
  name: string;
}

interface Subject {
  id: number;
  code: string;
  name: string;
  evaluation_type_ids: any[];
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
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

  createNote(noteData: any): Observable<any> {
    return this.makeRequest('/api/notes/create', noteData);
  }

  searchStudents(query: string): Observable<Student[]> {
    return this.makeRequest('/api/students/search', { query });
  }

  searchSubjects(query: string): Observable<Subject[]> {
    return this.makeRequest('/api/subjects/search', { query });
  }

  getStudentByIdentifiant(identifiant: string): Observable<any> {
    return this.makeRequest('/api/students/get', { identifiant });
  }

  getSubjectByCode(code: string): Observable<any> {
    return this.makeRequest('/api/subjects/get', { code });
  }
}