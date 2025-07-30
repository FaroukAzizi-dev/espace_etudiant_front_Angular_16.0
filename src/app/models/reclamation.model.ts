// models/reclamation.model.ts
export interface Reclamation {
  id: number;
  titre: string;
  description: string;
  etat: string;
  date_creation: string;
  reponse_admin?: string;
  date_traitement?: string;
  admin?: string;
}