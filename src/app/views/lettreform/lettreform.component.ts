import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LettreAffectationService } from '../../services/lettreaffectation/lettreaffectation.service';

@Component({
  selector: 'app-lettreform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lettreform.component.html',
  styleUrl: './lettreform.component.scss'
})
export class LettreformComponent {

    lettreForm : FormGroup;
    isLoading = false;

    constructor(
      private fb: FormBuilder,
      private lettreService: LettreAffectationService
    ) {
      this.lettreForm = this.fb.group({
         nom: ['', Validators.required],
          addresse: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          numero: ['', Validators.required],
          datedeb: ['', Validators.required],
          datefin: ['', Validators.required],
          responsable: ['', Validators.required]
      })
    }

    async onSubmit() {
    
    if (this.lettreForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    this.isLoading = true;

    try {
      const pdfBlob = await this.lettreService.generateLettreAffectation(this.lettreForm.value);
      this.downloadPdf(pdfBlob, 'lettre_affectation.pdf');
    } catch (error) {
      console.error('Error:', error);
      alert(`Erreur lors de la génération: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      this.isLoading = false;
    }
  }

  private downloadPdf(blob: Blob, filename: string): void {
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
