// components/teacher-absences/teacher-absences.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AbsenceService } from '../../../services/absence/absence.service';

@Component({
  selector: 'app-teacher-absences',
  standalone: true,
  imports: [CommonModule, FormsModule],
 template: `
    <div class="space-y-4 bg-yellow-50 p-6 rounded-xl shadow-md">
      <h2 class="text-2xl font-bold text-black border-b-2 border-yellow-400 pb-2">
        Gestion des Absences
      </h2>

      <!-- Choix de la classe -->
      <div class="flex items-center gap-3">
        <label class="text-sm font-semibold text-black">Classe</label>
        <select class="border border-yellow-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                [(ngModel)]="selectedClassId"
                (change)="onClassChange()">
          <option [ngValue]="null" disabled>-- Sélectionner une classe --</option>
          <option *ngFor="let c of classes" [ngValue]="c.id">{{ c.name }}</option>
        </select>

        <span *ngIf="loadingClasses" class="text-xs text-gray-600">Chargement...</span>
        <span *ngIf="error" class="text-xs text-red-600">{{ error }}</span>
      </div>

      <!-- Tableau des étudiants -->
      <div *ngIf="students.length" class="overflow-x-auto">
        <table class="min-w-full border border-yellow-400 rounded-lg overflow-hidden">
          <thead>
            <tr class="bg-yellow-200">
              <th class="p-2 text-left text-black">Étudiant</th>
              <th class="p-2 text-left text-black">Début</th>
              <th class="p-2 text-left text-black">Fin</th>
              <th class="p-2 text-left text-black">Justifiée</th>
              <th class="p-2 text-left text-black">Motif</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr *ngFor="let s of students" class="border-t hover:bg-yellow-50 transition">
              <td class="p-2 text-black">{{ s.name }}</td>
              <td class="p-2">
                <input class="border border-yellow-400 rounded px-2 py-1 focus:ring-2 focus:ring-yellow-500" 
                       type="datetime-local" [(ngModel)]="s.heure_debut" />
              </td>
              <td class="p-2">
                <input class="border border-yellow-400 rounded px-2 py-1 focus:ring-2 focus:ring-yellow-500" 
                       type="datetime-local" [(ngModel)]="s.heure_fin" />
              </td>
              <td class="p-2">
                <select class="border border-yellow-400 rounded px-2 py-1 focus:ring-2 focus:ring-yellow-500" 
                        [(ngModel)]="s.justifiee">
                  <option value="non_justifiee">Non justifiée</option>
                  <option value="justifiee">Justifiée</option>
                </select>
              </td>
              <td class="p-2">
                <input class="border border-yellow-400 rounded px-2 py-1 w-full focus:ring-2 focus:ring-yellow-500" 
                       type="text" [(ngModel)]="s.motif" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3" *ngIf="students.length">
        <button class="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-md transition"
                (click)="saveAll()"
                [disabled]="saving">
          {{ saving ? 'Enregistrement...' : 'Enregistrer toutes les absences' }}
        </button>
        <span class="text-xs text-gray-600" *ngIf="loadingStudents">Chargement des étudiants...</span>
        <span class="text-xs text-green-700" *ngIf="saved">Absences enregistrées ✅</span>
      </div>

      <!-- Vide -->
      <p *ngIf="!students.length && selectedClassId && !loadingStudents" class="text-sm text-gray-600">
        Aucun étudiant trouvé pour cette classe.
      </p>
    </div>
  `
})
export class TeacherAbsencesComponent implements OnInit {
  classes: Array<{id:number; name:string}> = [];
  selectedClassId: number | null = null;

  students: any[] = [];

  loadingClasses = false;
  loadingStudents = false;
  saving = false;
  saved = false;
  error = '';

  constructor(private absenceSvc: AbsenceService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.loadingClasses = true;
    this.error = '';
    this.absenceSvc.getMyClasses().subscribe({
      next: (res) => {
        this.classes = res || [];
        this.loadingClasses = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des classes';
        this.loadingClasses = false;
        console.error(err);
      }
    });
  }

  onClassChange(): void {
    this.students = [];
    this.saved = false;
    if (!this.selectedClassId) return;
    this.loadingStudents = true;
    this.absenceSvc.getStudentsByClass(this.selectedClassId).subscribe({
      next: (res) => {
        // Préparer le modèle d’édition pour chaque étudiant
        this.students = (res || []).map((s: any) => ({
          ...s,
          heure_debut: '',
          heure_fin: '',
          justifiee: 'non_justifiee',
          motif: ''
        }));
        this.loadingStudents = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des étudiants';
        this.loadingStudents = false;
        console.error(err);
      }
    });
  }

  saveAll(): void {
    const absences = this.students
      .filter(s => s.heure_debut && s.heure_fin)
      .map(s => ({
        etudiant_id: s.id,
        heure_debut: s.heure_debut,
        heure_fin: s.heure_fin,
        justifiee: s.justifiee,
        motif: s.motif
      }));

    if (!absences.length) return;

    this.saving = true;
    this.saved = false;
    this.absenceSvc.bulkCreateAbsences(absences).subscribe({
      next: () => {
        this.saving = false;
        this.saved = true;
      },
      error: (err) => {
        this.saving = false;
        this.error = 'Erreur lors de l’enregistrement des absences';
        console.error(err);
      }
    });
  }
}
