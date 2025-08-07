import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbsenceService } from '../../../services/absence/absence.service';
import { NoteService } from '../../../services/note/note.service';

@Component({
  selector: 'app-teacher-absences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-absences.component.html',
  styleUrls: ['./teacher-absences.component.scss']
})
export class TeacherAbsencesComponent {
  absenceForm: FormGroup;
  students: any[] = [];
  isLoading = false;
  showStudentList = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private absenceService: AbsenceService,
    private noteService: NoteService
  ) {
    this.absenceForm = this.fb.group({
      etudiant_id: ['', Validators.required],
      etudiant_identifiant: ['', Validators.required],
      heure_debut: ['', Validators.required],
      heure_fin: ['', Validators.required],
      justifiee: ['non_justifiee', Validators.required],
      motif: ['']
    });
  }

  searchStudents(query: string): void {
    if (query.length < 2) {
      this.students = [];
      this.showStudentList = false;
      return;
    }

    this.noteService.searchStudents(query).subscribe({
      next: (students) => {
        this.students = students;
        this.showStudentList = students.length > 0;
      },
      error: (err) => {
        console.error('Erreur recherche étudiants:', err);
        this.students = [];
        this.showStudentList = false;
      }
    });
  }

  selectStudent(student: any): void {
    this.absenceForm.patchValue({
      etudiant_id: student.id,
      etudiant_identifiant: student.identifiant
    });
    this.students = [];
    this.showStudentList = false;
  }

  onSubmit(): void {
    this.clearMessages();
    
    if (!this.absenceForm.valid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    // Validation des dates
    const heureDebut = new Date(this.absenceForm.value.heure_debut);
    const heureFin = new Date(this.absenceForm.value.heure_fin);
    
    if (heureDebut >= heureFin) {
      this.errorMessage = 'L\'heure de fin doit être postérieure à l\'heure de début';
      return;
    }

    this.isLoading = true;
    
    const formData = {
      etudiant_id: parseInt(this.absenceForm.value.etudiant_id),
      heure_debut: this.absenceForm.value.heure_debut,
      heure_fin: this.absenceForm.value.heure_fin,
      justifiee: this.absenceForm.value.justifiee,
      motif: this.absenceForm.value.motif || ''
    };

    console.log('Données envoyées:', formData);

    this.absenceService.createAbsence(formData).subscribe({
      next: (response) => {
        console.log('Réponse serveur:', response);
        this.successMessage = 'Absence enregistrée avec succès!';
        this.absenceForm.reset({
          justifiee: 'non_justifiee'
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur complète:', error);
        this.errorMessage = `Erreur: ${error.error?.error || error.message || 'Erreur inconnue'}`;
        this.isLoading = false;
      }
    });
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  validateDate(field: string): void {
    const control = this.absenceForm.get(field);
    if (control?.value) {
      const date = new Date(control.value);
      if (isNaN(date.getTime())) {
        control.setErrors({ invalidDate: true });
      }
    }
  }
}