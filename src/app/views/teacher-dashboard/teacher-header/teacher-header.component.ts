import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="border-b border-border bg-background px-4 py-3 flex items-center justify-between shadow-sm">
      <div class="flex items-center">
        <button class="lg:hidden mr-3 hover:bg-accent p-2 rounded-md transition-colors"
                (click)="onMenuClick.emit()">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="flex items-center">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
            <span class="text-primary-foreground font-bold text-sm">ISP</span>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-lg font-bold text-foreground">ISP TED University</h1>
          </div>
        </div>
      </div>

      <div class="flex-1 text-center">
        <h2 class="text-lg font-semibold text-foreground">Tableau de Bord Enseignant</h2>
      </div>

      <div class="flex items-center space-x-3">
        <button class="relative hover:bg-accent p-2 rounded-md transition-colors">
          <svg class="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19H6.5A2.5 2.5 0 0 1 4 16.5v-9A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5H11z"/>
          </svg>
          <span class="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full border-2 border-background"></span>
        </button>

        <div class="relative">
          <button class="relative h-9 w-9 rounded-full hover:bg-accent p-1 transition-colors">
            <div class="h-8 w-8 bg-accent text-accent-foreground text-sm font-medium rounded-full flex items-center justify-center">
              PR
            </div>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  @Output() onMenuClick = new EventEmitter<void>();
}