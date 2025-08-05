import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemandestageService } from '../../services/demandestage/demandestage.service';
import { AuthServiceService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-documentstage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './documentstage.component.html',
  styleUrls: ['./documentstage.component.scss'] // Consider using styleUrls instead of styles
})
export class DocumentstageComponent {
  isLoading = false;

  constructor(
    private demandestage: DemandestageService,
    private authService: AuthServiceService
  ) {}

  documents = [
    {
      id: 'demande-stage', // Added ID
      title: 'Demande de Stage',
      description: 'Soumettre votre demande de stage officielle avec tous les documents requis',
      action: 'generate',
      colorTheme: 'blue'
    },
    {
      id: 'journal-stage',
      title: 'Journal de Stage',
      description: 'Remplir votre journal de stage quotidien et suivre vos progrès',
      action: 'download',
      filePath: 'assets/documents/journal-de-stage.pdf',
      colorTheme: 'green'
    },
    {
      id: 'lettre-affectation',
      title: 'Lettre d\'Affectation',
      description: 'Générer et télécharger votre lettre d\'affectation officielle',
      action: 'route',
      route: '/dashboard/lettre-affectation',
      colorTheme: 'red'
    }
  ];

  getGradientClass(colorTheme: string): string {
    const gradients = {
      'blue': 'bg-gradient-to-br from-blue-500 to-blue-600',
      'green': 'bg-gradient-to-br from-green-500 to-green-600',
      'red': 'bg-gradient-to-br from-red-500 to-red-600'
    };
    return gradients[colorTheme as keyof typeof gradients] || gradients['blue'];
  }

  handleDocumentClick(doc: any, event: Event): void {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event bubbling
    
    switch(doc.action) {
      case 'download':
        console.log('Document clicked:', doc);
        console.log('Action:', doc.action);
        if (doc.filePath) this.downloadPdf(doc.filePath);
        break;
      case 'generate':
        console.log('Document clicked:', doc);
        console.log('Action:', doc.action);
        this.onDemandeStageClick(); // Removed the id check since we're using action
        break;
      case 'route':
        // Let the routerLink handle this
        break;
      default:
        console.warn('Unknown document action:', doc.action);
    }
  }

  private downloadPdf(filePath: string): void {
    const link = document.createElement('a');
    link.href = filePath;
    link.target = '_blank';
    link.download = filePath.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async onDemandeStageClick(): Promise<void> {
    if (!this.authService.isLoggedIn()) {
      alert('Veuillez vous connecter pour accéder à cette fonctionnalité');
      return;
    }

    this.isLoading = true;
    
    try {
      const pdfBlob = await this.demandestage.generateDemandeStage();
      this.downloadGeneratedPdf(pdfBlob, 'demande_de_stage.pdf');
    } catch (error) {
      console.error('Error:', error);
      alert(`Erreur lors de la génération: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      this.isLoading = false;
    }
  }

  private downloadGeneratedPdf(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
}