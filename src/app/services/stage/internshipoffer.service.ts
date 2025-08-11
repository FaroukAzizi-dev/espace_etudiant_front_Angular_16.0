import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InternshipOffer {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
  requirements: string;
  remuneration: string;
  deadline: string;
  contact_email: string;
  lien: string;
}

@Injectable({
  providedIn: 'root'
})
export class InternshipOfferService {
  private apiUrl = '/api/internship-offers';

  constructor(private http: HttpClient) { }

  getOffers(): Observable<InternshipOffer[]> {
    return this.http.get<InternshipOffer[]>(this.apiUrl);
  }

}