// absencelist.component.ts - Version propre sans code de style
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsenceService } from '../../../services/listabsence_etudiant/absence.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-absence-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './absencelist.component.html',
  styleUrls: ['./absencelist.component.scss']
})
export class AbsenceListComponent implements OnInit {
  private absenceService = inject(AbsenceService);

  absences: any[] = [];
  displayedColumns: string[] = ['date', 'heure_debut', 'heure_fin', 'statut', 'motif'];
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadAbsences();
  }

  loadAbsences(): void {
    this.isLoading = true;
    this.error = null;

    this.absenceService.getAbsences().subscribe({
      next: (response) => {
        this.absences = response.absences.map(absence => ({
          ...absence,
          date: absence.heure_debut.split(' ')[0],
          heure_debut: absence.heure_debut.split(' ')[1],
          heure_fin: absence.heure_fin ? absence.heure_fin.split(' ')[1] : ''
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Erreur lors du chargement des absences';
        this.isLoading = false;
      }
    });
  }

  refresh(): void {
    this.loadAbsences();
  }
}