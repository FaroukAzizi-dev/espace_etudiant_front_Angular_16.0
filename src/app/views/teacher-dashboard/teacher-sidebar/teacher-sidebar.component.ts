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

    <div class="fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-50 
                transform transition-transform duration-300 ease-in-out shadow-lg
                lg:translate-x-0 lg:static lg:shadow-none lg:z-auto"
         [class.translate-x-0]="isOpen"
         [class.-translate-x-full]="!isOpen">
      <div class="flex flex-col h-full">
        <div class="p-6 border-b border-border lg:hidden">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <span class="text-primary-foreground font-bold text-sm">ISP</span>
              </div>
              <div>
                <h1 class="text-lg font-bold text-foreground">ISP TED</h1>
              </div>
            </div>
            <button class="hover:bg-accent p-2 rounded-md transition-colors"
                    (click)="onClose.emit()">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <nav class="flex-1 p-4">
          <div class="space-y-2">
            <a class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-foreground hover:bg-accent">
              <svg class="mr-3 h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Tableau de bord
            </a>
          </div>
        </nav>

        <div class="p-4 border-t border-border">
          <div class="text-xs text-muted-foreground text-center">
            <p>Version Enseignant</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
}