import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectService } from '../../../services/subject/subject.service';
import { AuthServiceService } from '../../../services/auth/auth-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-subjects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main class="flex-1 overflow-y-auto p-6 bg-background">
      <div class="mx-auto max-w-7xl space-y-8">
        <!-- Header -->
        <div class="rounded-xl bg-gradient-to-r from-primary to-isp-yellow p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="mb-2 text-2xl font-bold">Mes Matières Enseignées</h1>
              <p class="text-lg text-primary-foreground">
                Gérez vos matières par classe et consultez les détails.
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

        <!-- View Toggle -->
        <div class="flex justify-center space-x-4">
          <button 
            (click)="toggleView('subjects')"
            [class]="viewMode === 'subjects' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border'"
            class="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-primary/90">
            Vue par Matières
          </button>
          <button 
            (click)="toggleView('classes')"
            [class]="viewMode === 'classes' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border'"
            class="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-primary/90">
            Vue par Classes
          </button>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="text-center p-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p class="mt-4 text-muted-foreground">Chargement des données...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="errorMessage && !isLoading" class="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p class="text-destructive">{{ errorMessage }}</p>
        </div>

        <!-- Subjects View -->
        <div *ngIf="!isLoading && !selectedSubject && viewMode === 'subjects'" class="space-y-6">
          <div class="flex items-center">
            <svg class="mr-3 h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 class="text-2xl font-bold text-foreground">Liste des Matières</h2>
          </div>

          <div *ngIf="subjects.length === 0" class="text-center p-8 bg-card border border-border rounded-lg">
            <svg class="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-foreground">Aucune matière assignée</h3>
            <p class="mt-1 text-sm text-muted-foreground">Vous n'avez actuellement aucune matière assignée.</p>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" *ngIf="subjects.length > 0">
            <div *ngFor="let subject of subjects" 
                 class="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                 (click)="showSubjectDetails(subject.id)">
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-foreground">{{ subject.name }}</h3>
                  <p class="text-sm text-muted-foreground mt-1">{{ subject.code }}</p>
                </div>
              </div>
              
              <!-- Classe Information - Prominent Display -->
              <div class="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div class="flex items-center">
                  <svg class="mr-2 h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <p class="font-medium text-primary">{{ subject.classe_info?.name || subject.classe }}</p>
                    <p class="text-xs text-muted-foreground" *ngIf="subject.classe_info?.filiere || subject.classe_info?.niveau">
                      <span *ngIf="subject.classe_info?.filiere">{{ subject.classe_info.filiere }}</span>
                      <span *ngIf="subject.classe_info?.filiere && subject.classe_info?.niveau"> - </span>
                      <span *ngIf="subject.classe_info?.niveau">{{ subject.classe_info.niveau }}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between text-sm text-muted-foreground">
                <span class="flex items-center">
                  <svg class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ subject.volume_horaire }}h
                </span>
                <span class="flex items-center">
                  <svg class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Coeff. {{ subject.coefficient }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Classes View -->
        <div *ngIf="!isLoading && !selectedSubject && viewMode === 'classes'" class="space-y-6">
          <div class="flex items-center">
            <svg class="mr-3 h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h2 class="text-2xl font-bold text-foreground">Mes Classes</h2>
          </div>

          <div *ngIf="classes.length === 0" class="text-center p-8 bg-card border border-border rounded-lg">
            <h3 class="mt-2 text-sm font-medium text-foreground">Aucune classe assignée</h3>
            <p class="mt-1 text-sm text-muted-foreground">Vous n'enseignez actuellement dans aucune classe.</p>
          </div>

          <div class="space-y-6" *ngIf="classes.length > 0">
            <div *ngFor="let classe of classes" class="bg-card border border-border rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-xl font-bold text-foreground">{{ classe.name }}</h3>
                  <p class="text-muted-foreground">
                    <span *ngIf="classe.filiere">{{ classe.filiere }}</span>
                    <span *ngIf="classe.filiere && classe.niveau"> - </span>
                    <span *ngIf="classe.niveau">{{ classe.niveau }}</span>
                  </p>
                </div>
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {{ classe.subjects.length }} matière(s)
                </span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div *ngFor="let subject of classe.subjects" 
                     class="bg-background border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                     (click)="showSubjectDetails(subject.id)">
                  <h4 class="font-medium text-foreground">{{ subject.name }}</h4>
                  <p class="text-sm text-muted-foreground">{{ subject.code }}</p>
                  <div class="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>{{ subject.volume_horaire }}h</span>
                    <span>Coeff. {{ subject.coefficient }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subject Details -->
        <div *ngIf="selectedSubject" class="space-y-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <button (click)="closeDetails()" 
                      class="mr-4 p-2 hover:bg-accent rounded-lg transition-colors">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 class="text-2xl font-bold text-foreground">{{ selectedSubject.name }}</h2>
                <p class="text-muted-foreground">{{ selectedSubject.code }}</p>
                <div class="mt-1 flex items-center text-sm text-primary">
                  <svg class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <strong>Classe: {{ selectedSubject.classe_info?.name || selectedSubject.classe }}</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Subject Info -->
            <div class="bg-card border border-border rounded-lg p-6">
              <h3 class="text-lg font-medium text-foreground mb-4">Description</h3>
              <p class="text-muted-foreground mb-6">{{ selectedSubject.description || 'Aucune description disponible' }}</p>
              
              <!-- Classe Details -->
              <div class="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 class="text-md font-medium text-foreground mb-2">Informations sur la classe</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Classe:</span>
                    <span class="text-foreground font-medium">{{ selectedSubject.classe_info?.name || selectedSubject.classe }}</span>
                  </div>
                  <div class="flex justify-between" *ngIf="selectedSubject.classe_info?.filiere">
                    <span class="text-muted-foreground">Filière:</span>
                    <span class="text-foreground">{{ selectedSubject.classe_info.filiere }}</span>
                  </div>
                  <div class="flex justify-between" *ngIf="selectedSubject.classe_info?.niveau">
                    <span class="text-muted-foreground">Niveau:</span>
                    <span class="text-foreground">{{ selectedSubject.classe_info.niveau }}</span>
                  </div>
                </div>
              </div>
              
              <div class="space-y-3">
                <h4 class="text-md font-medium text-foreground">Informations sur la matière</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Semestre:</span>
                    <span class="text-foreground">Semestre {{ selectedSubject.semestre }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Volume horaire:</span>
                    <span class="text-foreground">{{ selectedSubject.volume_horaire }} heures</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Coefficient:</span>
                    <span class="text-foreground">{{ selectedSubject.coefficient }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Schedule -->
            <div class="bg-card border border-border rounded-lg p-6">
              <h3 class="text-lg font-medium text-foreground mb-4">Emploi du temps</h3>
              
              <div *ngIf="subjectSchedule.length > 0" class="space-y-3">
                <div *ngFor="let session of subjectSchedule" 
                     class="border border-border rounded-lg p-3">
                  <div class="flex justify-between items-center">
                    <div>
                      <span class="font-medium text-foreground">{{ session.day }}</span>
                      <span class="text-muted-foreground ml-2">{{ session.start_time }} - {{ session.end_time }}</span>
                    </div>
                    <span class="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{{ session.classroom }}</span>
                  </div>
                </div>
              </div>
              
              <div *ngIf="subjectSchedule.length === 0" class="text-center p-4 text-muted-foreground">
                <p>Aucun horaire programmé pour cette matière</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: []
})
export class TeacherSubjectsComponent implements OnInit {
  subjects: any[] = [];
  classes: any[] = [];
  isLoading = true;
  selectedSubject: any = null;
  subjectSchedule: any[] = [];
  errorMessage: string | null = null;
  viewMode: 'subjects' | 'classes' = 'subjects';

  constructor(
    private subjectService: SubjectService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    if (this.viewMode === 'subjects') {
      this.loadSubjects();
    } else {
      this.loadClasses();
    }
  }

  loadSubjects(): void {
    this.subjectService.getTeacherSubjects().subscribe({
      next: (data) => {
        this.subjects = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading subjects:', err);
        this.errorMessage = 'Erreur lors du chargement des matières';
        this.isLoading = false;
      }
    });
  }

  loadClasses(): void {
    this.subjectService.getTeacherClasses().subscribe({
      next: (data) => {
        this.classes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading classes:', err);
        this.errorMessage = 'Erreur lors du chargement des classes';
        this.isLoading = false;
      }
    });
  }

  toggleView(mode: 'subjects' | 'classes'): void {
    if (this.viewMode !== mode) {
      this.viewMode = mode;
      this.selectedSubject = null;
      this.loadData();
    }
  }

  showSubjectDetails(subjectId: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.subjectService.getSubjectDetails(subjectId).subscribe({
      next: (data) => {
        this.selectedSubject = data;
        this.loadSubjectSchedule(subjectId);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading subject details:', err);
        this.errorMessage = 'Erreur lors du chargement des détails';
        this.isLoading = false;
      }
    });
  }

  loadSubjectSchedule(subjectId: number): void {
    this.subjectService.getSubjectSchedule(subjectId).subscribe({
      next: (data) => {
        this.subjectSchedule = data;
      },
      error: (err) => {
        console.error('Error loading schedule:', err);
        this.subjectSchedule = [];
      }
    });
  }

  closeDetails(): void {
    this.selectedSubject = null;
    this.subjectSchedule = [];
  }
}