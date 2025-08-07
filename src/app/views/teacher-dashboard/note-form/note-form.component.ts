import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { NoteService } from '../../../services/note/note.service';

interface Student {
  id: number;
  identifiant: string;
  name: string;
}

interface Subject {
  id: number;
  code: string;
  name: string;
  evaluation_type_ids: any[];
}

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  students: Student[] = [];
  subjects: Subject[] = [];
  showFields = {
    cc: false,
    tp: false,
    examen: false
  };
  isLoading = false;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService
  ) {
    this.noteForm = this.fb.group({
      etudiant_identifiant: ['', Validators.required],
      etudiant_id: [null, Validators.required],
      matiere_code: ['', Validators.required],
      matiere_id: [null, Validators.required],
      note_cc: [0, [Validators.min(0), Validators.max(20)]],
      note_tp: [0, [Validators.min(0), Validators.max(20)]],
      note_examen: [0, [Validators.min(0), Validators.max(20)]]
    });
  }

    ngOnInit(): void {
      this.setupFormListeners();
    }

    setupFormListeners(): void {
      // Écouter les changements de l'identifiant étudiant
      this.noteForm.get('etudiant_identifiant')?.valueChanges.subscribe(val => {
        if (val && val.length > 2) {
          this.searchStudents(val);
        } else {
          this.students = [];
        }
      });

      // Écouter les changements du code matière
      this.noteForm.get('matiere_code')?.valueChanges.subscribe(val => {
        if (val && val.length > 2) {
          this.searchSubjects(val);
        } else {
          this.subjects = [];
        }
      });
    }

    searchStudents(query: string): void {
      this.noteService.searchStudents(query).subscribe({
        next: (response: any) => {
          this.students = response || [];
        },
        error: (err) => {
          console.error('Erreur recherche étudiants:', err);
          this.students = [];
        }
      });
    }

    searchSubjects(query: string): void {
      this.noteService.searchSubjects(query).subscribe({
        next: (response: any) => {
          this.subjects = response || [];
        },
        error: (err) => {
          console.error('Erreur recherche matières:', err);
          this.subjects = [];
        }
      });
    }

    updateFieldVisibility(evaluationTypes: any[] = []): void {
      const types = evaluationTypes.map(et => et.type);
      this.showFields = {
        cc: types.includes('cc'),
        tp: types.includes('tp'),
        examen: types.includes('examen')
      };
    }

    selectStudent(student: Student): void {
      this.noteForm.patchValue({
        etudiant_id: student.id,
        etudiant_identifiant: student.identifiant
      });
      this.students = [];
    }

    selectSubject(subject: Subject): void {
      this.noteForm.patchValue({
        matiere_id: subject.id,
        matiere_code: subject.code
      });
      this.updateFieldVisibility(subject.evaluation_type_ids || []);
      this.subjects = [];
    }

    onSubmit(): void {
  if (this.noteForm.valid) {
    this.isLoading = true;
    
    const formData = this.noteForm.value;
    console.log('Données envoyées:', formData); // DEBUG
    
    this.noteService.createNote(formData).subscribe({
      next: (response) => {
        console.log('Note créée avec succès:', response);
        alert('Note enregistrée avec succès!');
        this.resetForm();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement:', error);
        alert('Erreur lors de l\'enregistrement de la note');
        this.isLoading = false;
      }
    });
  } else {
    alert('Veuillez remplir tous les champs obligatoires');
  }
}

    resetForm(): void {
      this.noteForm.reset({
        etudiant_identifiant: '',
        etudiant_id: '',
        matiere_code: '',
        matiere_id: '',
        note_cc: 0,
        note_tp: 0,
        note_examen: 0
      });
      this.showFields = {
        cc: false,
        tp: false,
        examen: false
      };
    }
  }