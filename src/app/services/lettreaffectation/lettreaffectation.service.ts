import { Injectable } from '@angular/core';
import { AcademicService } from '../academicservice/academic.service';
import { AuthServiceService } from '../auth/auth-service.service';
import { PDFDocument, rgb } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class LettreAffectationService {
  constructor(
    private academicService: AcademicService,
    private authService: AuthServiceService
  ) { }

  async generateLettreAffectation(formData: any): Promise<Blob> {
    try {
      // Get student info from auth service
      const studentName = this.authService.getUserName();
      if (!studentName) {
        throw new Error('Student name not available in session');
      }

      // Get academic info from backend
      const academicInfo = await this.academicService.getAcademicInfo().toPromise();
      if (academicInfo?.error) {
        throw new Error(academicInfo.error);
      }

      // Combine all data for PDF
      const pdfData = {
        ...formData,
        ...academicInfo,
        etudiant: studentName,
        dateGeneration: new Date().toLocaleDateString('fr-FR')
      };

      return await this.fillPdf(pdfData);
    } catch (error) {
      console.error('Error generating lettre d\'affectation:', error);
      throw error;
    }
  }

  private async fillPdf(data: any): Promise<Blob> {
    try {
      // Load your PDF template (create one in assets/documents/)
      const pdfUrl = 'assets/documents/lettre_affectation.pdf';
      const response = await fetch(pdfUrl);
      
      if (!response.ok) {
        throw new Error('Failed to load PDF template');
      }

      const pdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const page = pdfDoc.getPages()[0];
      const { width, height } = page.getSize();

      const fields = {
        studentName: { x: 250, y: height - 338 },
        programme: { x: 130, y: height - 358 },
        entreprise: { x: 250, y: height - 417 },
        address: { x: 220, y: height - 437 },
        email : { x: 115 , y: height - 454},
        numero : { x : 135 , y: height - 474},
        dates: { x: 178, y: height - 492 },
        responsable: { x: 155, y: height - 511 },
        date: {x : 500, y: height - 241 }
      };

      // Fill the PDF fields
      page.drawText(data.etudiant, {
        x: fields.studentName.x,
        y: fields.studentName.y,
        size: 12,
      });

      page.drawText(`${data.niveau} ${data.programme}`, {
        x: fields.programme.x,
        y: fields.programme.y,
        size: 12,
      });

      page.drawText(data.nom, {
        x: fields.entreprise.x,
        y: fields.entreprise.y,
        size: 12,
      });

      page.drawText(data.addresse, {
        x: fields.address.x,
        y: fields.address.y,
        size: 12,
      });

      page.drawText(`Du ${data.datedeb} au ${data.datefin}`, {
        x: fields.dates.x,
        y: fields.dates.y,
        size: 12,
      });

      page.drawText(data.responsable, {
        x: fields.responsable.x,
        y: fields.responsable.y,
        size: 12,
      });

      page.drawText(data.email, {
        x: fields.email.x,
        y: fields.email.y,
        size: 12,
      });

      
      page.drawText(data.numero, {
        x: fields.numero.x,
        y: fields.numero.y,
        size: 12,
      });

       page.drawText(data.date, {
        x: fields.date.x,
        y: fields.date.y,
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