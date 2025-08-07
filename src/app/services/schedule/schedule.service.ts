import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getStudentSchedule(): Observable<any> {
    return this.http.get('/api/student-schedule', {}).pipe(
      map((response: any) => {
        if (response.error) {
          throw new Error(response.error);
        }
        console.log('Sessions from backend:', response.sessions); 
        return response.sessions || [];
      }),
      catchError(error => {
        console.error('Error fetching student schedule:', error);
        throw error;
      })
    );
  }
}