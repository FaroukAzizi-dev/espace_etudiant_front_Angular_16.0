import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemandestageService } from '../../../services/demandestage/demandestage.service';
@Component({
  selector: 'app-documentstage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './documentstage.component.html',
  styles: []
})
export class DocumentstageComponent {

  constructor(private demandestage: DemandestageService) {

  }
  documents = [
    {
      title: 'Demande de Stage',
      description: 'Soumettre votre demande de stage officielle avec tous les documents requis',
      action: '(click)="onDemandeStageClick()"',
      colorTheme: 'blue'
    },
    {
      title: 'Journal de Stage',
      description: 'Remplir votre journal de stage quotidien et suivre vos progrès',
      action: 'download',
      filePath: 'assets/documents/journal-de-stage.pdf', // Chemin vers votre fichier PDF
      colorTheme: 'green'
    },
    {
      title: 'Lettre d\'Affectation',
      description: 'Générer et télécharger votre lettre d\'affectation officielle',
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

  handleDocumentClick(doc: any): void {
    if (doc.action === 'download' && doc.filePath) {
      this.downloadPdf(doc.filePath);
    }
  }

 private downloadPdf(filePath: string): void {
    const link = document.createElement('a');
    link.href = filePath; // Utilisera le chemin relatif 'assets/documents/journal-de-stage.pdf'
    link.target = '_blank';
    link.download = filePath.split('/').pop() || 'document.pdf';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

   onDemandeStageClick(): void {
    this.demandestage.generateDemandeStage();
  }
}