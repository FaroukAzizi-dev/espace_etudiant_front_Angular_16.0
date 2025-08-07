import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbsenceService } from '../../../services/absence/absence.service';
import { NoteService } from '../../../services/note/note.service';

@Component({
  selector: 'app-absence-form',
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.scss']
})
export class AbsenceFormComponent {
  absenceForm: FormGroup;
  students: any[] = [];

  constructor(
    private fb: FormBuilder,
    private absenceService: AbsenceService,
    private noteService: NoteService
  ) {
    this.absenceForm = this.fb.group({
      etudiant_id: ['', Validators.required],
      heure_debut: ['', Validators.required],
      heure_fin: ['', Validators.required],
      justifiee: ['non_justifiee', Validators.required],
      motif: ['']
    });
  }

  searchStudents(query: string): void {
    this.noteService.searchStudents(query).subscribe({
      next: (students) => this.students = students,
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.absenceForm.valid) {
      this.absenceService.createAbsence(this.absenceForm.value).subscribe({
        next: (res) => alert('Absence enregistrée avec succès!'),
        error: (err) => console.error(err)
      });
    }
  }
}