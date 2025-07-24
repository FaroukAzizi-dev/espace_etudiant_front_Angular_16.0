import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReclamationService } from '../../services/reclamation/reclamation.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ReclamationComponent {
  reclamationForm: FormGroup;
  submissionInProgress = false;

  constructor(
    private fb: FormBuilder,
    private reclamationService: ReclamationService
  ) { 
    console.log('Initializing ReclamationComponent');
    this.reclamationForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      pieceJointe: [null]
    });

    this.setupFormListeners();
  }

  private setupFormListeners(): void {
    this.reclamationForm.valueChanges.subscribe(values => {
      console.log('Form values changed:', {
        titre: values.titre,
        description: values.description,
        file: values.pieceJointe ? values.pieceJointe.name : null
      });
    });
  }

  onFileChange(event: Event): void {
    console.log('File input changed');
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', {
        name: file.name,
        type: file.type,
        size: file.size
      });
      this.reclamationForm.patchValue({
        pieceJointe: file
      });
      this.reclamationForm.get('pieceJointe')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    console.log('Form submission initiated');
    console.log('Current form status:', {
      valid: this.reclamationForm.valid,
      pristine: this.reclamationForm.pristine,
      touched: this.reclamationForm.touched,
      errors: this.reclamationForm.errors
    });

    this.reclamationForm.markAllAsTouched();

    if (this.reclamationForm.valid) {
      this.submissionInProgress = true;
      
      const formValues = this.reclamationForm.getRawValue();
      console.log('Submitting form with values:', {
        titre: formValues.titre,
        description: formValues.description,
        file: formValues.pieceJointe ? formValues.pieceJointe.name : null
      });

      this.reclamationService.createReclamation(
        formValues.titre,
        formValues.description,
        formValues.pieceJointe
      ).subscribe({
        next: (response) => {
          console.log('Submission successful - Server response:', response);
          this.reclamationForm.reset();
          this.submissionInProgress = false;
          alert('Réclamation soumise avec succès!');
        },
        error: (error) => {
          console.error('Submission failed:', {
            error: error,
            status: error.status,
            message: error.message,
            url: error.url
          });
          this.submissionInProgress = false;
          alert(`Erreur lors de la soumission: ${error.message || 'Veuillez réessayer'}`);
        }
      });
    } else {
      console.warn('Form is invalid - Validation errors:', {
        titre: this.reclamationForm.get('titre')?.errors,
        description: this.reclamationForm.get('description')?.errors
      });
      alert('Veuillez corriger les erreurs dans le formulaire');
    }
  }
}