import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date?: string;
  location?: string;
  image?: string;
  link?: string; // Ajout de la propriété pour le lien d'inscription
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = '/api/student/events';

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<{events: Event[]}> {
    return this.http.get<{events: Event[]}>(this.apiUrl);
  }
}