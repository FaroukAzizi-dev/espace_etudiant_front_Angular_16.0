import { Injectable } from '@angular/core';
import { AcademicService } from '../academicservice/academic.service';
import { AuthServiceService } from '../auth/auth-service.service';
import { PDFDocument } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class DemandestageService {
  constructor(
    private academicService: AcademicService,
    private authService: AuthServiceService
  ) { }

  async generateDemandeStage(): Promise<Blob> {
    try {
      // Get student info from auth service
      const studentName = this.authService.getUserName();
      if (!studentName) {
        throw new Error('Student name not available in session');
      }

      // Get academic info from backend
      const academicInfo = await this.academicService.getAcademicInfo().toPromise();
      console.log('Academic info:', academicInfo);
      console.log('Student name:', this.authService.getUserName());
      if (academicInfo?.error) {
        throw new Error(academicInfo.error);
      }

      // Combine data for PDF
      const pdfData = {
        ...academicInfo,
        etudiant: studentName,
        date: new Date().toLocaleDateString('fr-FR') // French date format
      };

      return await this.fillPdf(pdfData);
    } catch (error) {
      console.error('Error generating internship request:', error);
      throw error;
    }
  }

  private async fillPdf(data: any): Promise<Blob> {
  try {
    const pdfUrl = 'assets/documents/demande_de_stage.pdf';
    const response = await fetch(pdfUrl);
    
    if (!response.ok) {
      throw new Error('Failed to load PDF template');
    }

    const pdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const page = pdfDoc.getPages()[0];
    const { width, height } = page.getSize();

    // Coordinates configuration (adjust these as needed)
    const line1Y = height - 575;  // Y position for student name
    const line2Y = height - 595;  // Y position for programme/niveau
    const leftMargin = 140;       // Left margin for text

    // Draw student name (centered)
    page.drawText(data.etudiant || 'Non spécifié', {
      x: leftMargin,
      y: line1Y,
      size: 12,
    });

    // Combine programme and niveau in one line
    const programmeText = `${data.programme || 'Non spécifié'}`;
    const niveauText = `${data.niveau || 'Non spécifié'}`;
    const combinedText = `${niveauText} ${programmeText}`;

    // Draw combined programme/niveau text
    page.drawText(combinedText, {
      x: leftMargin,
      y: line2Y,
      size: 12,
    });

    const filledPdf = await pdfDoc.save();
    return new Blob([filledPdf], { type: 'application/pdf' });
  } catch (error) {
    console.error('PDF processing error:', error);
    throw new Error('Failed to generate PDF document');
  }
}
}