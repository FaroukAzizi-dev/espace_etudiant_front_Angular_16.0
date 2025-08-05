// src/app/services/academic.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcademicInfo } from '../../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {
  private apiUrl = '/api/student/academic_info'; // Proxy configuré vers Odoo

  constructor(private http: HttpClient) { }

  getAcademicInfo(): Observable<AcademicInfo> {
    return this.http.get<AcademicInfo>(this.apiUrl, {});
  }
}