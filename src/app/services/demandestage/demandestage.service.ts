// src/app/services/demandestage.service.ts
import { Injectable } from '@angular/core';
import { AcademicService } from '../academicservice/academic.service';

@Injectable({
  providedIn: 'root'
})
export class DemandestageService {
  constructor(
    private academicService: AcademicService,
  ) { }

  async generateDemandeStage(): Promise<Blob> {
    try {
      const academicInfo = await this.academicService.getAcademicInfo().toPromise();
      
      if (academicInfo?.error) {
        throw new Error(academicInfo.error);
      }

  

      return this.fillPdf({
        ...academicInfo,
        etudiant: student.name,
        date: new Date().toLocaleDateString()
      });
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }

  private async fillPdf(data: any): Promise<Blob> {
    const { PDFDocument } = await import('pdf-lib');
    const pdfUrl = 'assets/documents/demande_de_stage.pdf';
    
    try {
      const response = await fetch(pdfUrl);
      const pdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const form = pdfDoc.getForm();

      // Remplissage des champs PDF
      if (form.getTextField('etudiant')) {
        form.getTextField('etudiant').setText(data.etudiant || '');
      }
      if (form.getTextField('programme')) {
        form.getTextField('programme').setText(data.programme || '');
      }
      if (form.getTextField('niveau')) {
        form.getTextField('niveau').setText(data.niveau || '');
      }
      if (form.getTextField('filiere')) {
        form.getTextField('filiere').setText(data.filiere || '');
      }
      if (form.getTextField('date')) {
        form.getTextField('date').setText(data.date || '');
      }

      const filledPdf = await pdfDoc.save();
      return new Blob([filledPdf], { type: 'application/pdf' });
    } catch (error) {
      console.error('Erreur de génération PDF:', error);
      throw new Error('Erreur lors de la génération du PDF');
    }
  }
}