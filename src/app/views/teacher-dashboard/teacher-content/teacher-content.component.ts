import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteFormComponent } from '../note-form/note-form.component';

@Component({
  selector: 'app-teacher-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NoteFormComponent],
  template: `
    <main class="flex-1 overflow-y-auto p-6 bg-background">
      <div class="mx-auto max-w-7xl space-y-8">
        <!-- Welcome Banner -->
        <div class="rounded-xl bg-gradient-to-r from-primary to-isp-yellow p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="mb-2 text-2xl font-bold">Bienvenue, Professeur!</h1>
              <p class="text-lg text-primary-foreground">
                Gestion de vos cours, notes et absences.
              </p>
            </div>
            <div class="hidden md:block">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-20">
                <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Onglets de navigation -->
        <div class="flex border-b border-border">
          <button 
            (click)="activeTab = 'courses'"
            [class]="activeTab === 'courses' 
              ? 'border-b-2 border-primary text-primary font-medium' 
              : 'text-muted-foreground hover:text-foreground'"
            class="px-4 py-2 text-sm transition-colors">
            Mes Cours
          </button>
          <button 
            (click)="activeTab = 'grades'"
            [class]="activeTab === 'grades' 
              ? 'border-b-2 border-primary text-primary font-medium' 
              : 'text-muted-foreground hover:text-foreground'"
            class="px-4 py-2 text-sm transition-colors">
            Gestion des Notes
          </button>
          <button 
            (click)="activeTab = 'absences'"
            [class]="activeTab === 'absences' 
              ? 'border-b-2 border-primary text-primary font-medium' 
              : 'text-muted-foreground hover:text-foreground'"
            class="px-4 py-2 text-sm transition-colors">
            Gestion des Absences
          </button>
          <button 
            (click)="activeTab = 'stats'"
            [class]="activeTab === 'stats' 
              ? 'border-b-2 border-primary text-primary font-medium' 
              : 'text-muted-foreground hover:text-foreground'"
            class="px-4 py-2 text-sm transition-colors">
            Statistiques
          </button>
        </div>

        <!-- Contenu des onglets -->
        <div [ngSwitch]="activeTab">
          <!-- Onglet Mes Cours -->
          <section *ngSwitchCase="'courses'" class="space-y-6">
            <div class="flex items-center">
              <svg class="mr-3 h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h2 class="text-2xl font-bold text-foreground">Mes Cours</h2>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <!-- Contenu des cours à venir -->
              <div class="bg-card border border-border rounded-lg p-6">
                <h3 class="text-lg font-medium text-foreground">Nom du Cours</h3>
                <p class="text-sm text-muted-foreground mt-2">Description du cours</p>
              </div>
            </div>
          </section>

          <!-- Onglet Gestion des Notes -->
          <section *ngSwitchCase="'grades'" class="space-y-6">
            <div class="flex items-center">
              <svg class="mr-3 h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h2 class="text-2xl font-bold text-foreground">Gestion des Notes</h2>
            </div>
            
            <!-- Formulaire d'ajout de notes -->
            <div class="bg-card border border-border rounded-lg p-6">
              <app-note-form></app-note-form>
            </div>
            
            <!-- Liste des notes existantes (à implémenter) -->
            <div class="bg-card border border-border rounded-lg p-6">
              <h3 class="text-lg font-medium text-foreground mb-4">Notes récemment ajoutées</h3>
              <div class="text-muted-foreground text-sm">
                <p>Les notes ajoutées apparaîtront ici...</p>
              </div>
            </div>
          </section>

     
         <!-- Onglet Statistiques -->
          <section *ngSwitchCase="'stats'" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div class="rounded-lg border border-border bg-card">
                <div class="p-6 pb-2">
                  <h3 class="text-sm font-medium text-muted-foreground">Cours Actifs</h3>
                </div>
                <div class="px-6 pb-6">
                  <div class="text-2xl font-bold text-foreground">0</div>
                  <p class="mt-1 text-xs text-muted-foreground">En cours ce semestre</p>
                </div>
              </div>
              <div class="rounded-lg border border-border bg-card">
                <div class="p-6 pb-2">
                  <h3 class="text-sm font-medium text-muted-foreground">Étudiants</h3>
                </div>
                <div class="px-6 pb-6">
                  <div class="text-2xl font-bold text-foreground">0</div>
                  <p class="mt-1 text-xs text-muted-foreground">Inscrits à vos cours</p>
                </div>
              </div>
              <div class="rounded-lg border border-border bg-card">
                <div class="p-6 pb-2">
                  <h3 class="text-sm font-medium text-muted-foreground">Notes Moyennes</h3>
                </div>
                <div class="px-6 pb-6">
                  <div class="text-2xl font-bold text-foreground">0.00</div>
                  <p class="mt-1 text-xs text-muted-foreground">Moyenne de vos étudiants</p>
                </div>
              </div>
              <div class="rounded-lg border border-border bg-card">
                <div class="p-6 pb-2">
                  <h3 class="text-sm font-medium text-muted-foreground">Absences ce mois</h3>
                </div>
                <div class="px-6 pb-6">
                  <div class="text-2xl font-bold text-foreground">0</div>
                  <p class="mt-1 text-xs text-muted-foreground">Absences enregistrées</p>
                </div>
              </div>
            </div>

            <!-- Graphiques et statistiques détaillées -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div class="rounded-lg border border-border bg-card p-6">
                <h3 class="text-lg font-medium text-foreground mb-4">Évolution des absences</h3>
                <div class="text-muted-foreground text-sm">
                  <p>Graphique des absences par semaine à venir...</p>
                </div>
              </div>
              
              <div class="rounded-lg border border-border bg-card p-6">
                <h3 class="text-lg font-medium text-foreground mb-4">Répartition des notes</h3>
                <div class="text-muted-foreground text-sm">
                  <p>Graphique de répartition des notes à venir...</p>
                </div>
              </div>
            </div>

            <!-- Top étudiants avec le plus d'absences -->
            <div class="rounded-lg border border-border bg-card p-6">
              <h3 class="text-lg font-medium text-foreground mb-4">Étudiants avec le plus d'absences</h3>
              <div class="text-muted-foreground text-sm">
                <p>Liste des étudiants avec statistiques d'absences à venir...</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  `,
  styles: []
})
export class TeacherContentComponent {
  activeTab: 'courses' | 'grades' | 'absences' | 'stats' = 'courses';
}