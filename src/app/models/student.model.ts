// src/app/models/student.model.ts
export interface Student {
  id: number;
  uid: number;
  name: string;
  email: string;
  partner_id: number;
  company_id: number;
  is_admin: boolean;
}

export interface AcademicInfo {
  programme: string;
  niveau: string;
  filiere: string;
  error?: string;
}