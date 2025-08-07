// src/app/core/services/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = '/api/student/events';

  constructor(private http: HttpClient) { }


   getAllEvents(): Observable<any> {
      return this.http.get(this.apiUrl); 
      
    }
}
