import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobOffer {
  id: number;
  title: string;
  company:string;
  contract_type: string;
  description: string;
  requirements: string;
  salary: string;
  deadline: string;
  contact_email: string;
  lien: string
}

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {
  private apiUrl = '/api/job-offers';

  constructor(private http: HttpClient) { }

  getOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.apiUrl);
  }
}