import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
         *ngIf="isOpen" 
         (click)="onClose.emit()"></div>

    <div class="fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 
                transform transition-transform duration-300 ease-in-out shadow-lg
                lg:translate-x-0 lg:static lg:shadow-none lg:z-auto"
         [class.translate-x-0]="isOpen"
         [class.-translate-x-full]="!isOpen">
      <div class="flex flex-col h-full">
        <!-- Header avec logo -->
        <div class="p-4 border-b border-border flex items-center justify-between">
          <div class="flex items-center">
            <img [src]="getLogoPath()" alt="School Logo" class="h-8 mr-3">
            <h1 class="text-lg font-bold text-foreground">Espace Enseignant</h1>
          </div>
          <button class="hover:bg-accent p-1 rounded-md transition-colors lg:hidden"
                  (click)="onClose.emit()">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 overflow-y-auto">
          <div class="space-y-1">
            <!-- Dashboard -->
            <a routerLink="/enseignant-dashboard" 
               routerLinkActive="bg-primary/10 text-primary"
               [routerLinkActiveOptions]="{exact: true}"
               class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors">
              <svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Tableau de bord
            </a>

            <!-- Subjects -->
            <a routerLink="/enseignant-dashboard/subjects" 
               routerLinkActive="bg-primary/10 text-primary"
               class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors">
              <svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Mes Matières
            </a>

            <!-- Grades -->
            <a routerLink="/enseignant-dashboard/grades" 
               routerLinkActive="bg-primary/10 text-primary"
               class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors">
              <svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Gestion des Notes
            </a>

            <!-- Absences -->
            <a routerLink="/enseignant-dashboard/absences" 
               routerLinkActive="bg-primary/10 text-primary"
               class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors">
              <svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Gestion des Absences
            </a>

            <!-- Schedule -->
            <a routerLink="/enseignant-dashboard/schedule" 
               routerLinkActive="bg-primary/10 text-primary"
               class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-accent transition-colors">
              <svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Emploi du temps
            </a>
          </div>
        </nav>

        <!-- Footer -->
        <div class="p-4 border-t border-border">
          <div class="flex items-center justify-between">
            <div class="text-xs text-muted-foreground">
              <p>Version 1.0.0</p>
            </div>
            <button class="text-muted-foreground hover:text-foreground">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    
    nav a {
      transition: all 0.2s ease;
    }
    
    nav a:hover svg {
      color: var(--primary);
    }
    
    .router-link-active svg {
      color: var(--primary);
    }
  `]
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();

  getLogoPath(): string {
    return '/assets/images/logo2.png'; 
  }
}