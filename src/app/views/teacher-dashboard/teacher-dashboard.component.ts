import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../teacher-dashboard/teacher-header/teacher-header.component';
import { SidebarComponent } from '../teacher-dashboard/teacher-sidebar/teacher-sidebar.component';
import { TeacherContentComponent } from './teacher-content/teacher-content.component';
@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, TeacherContentComponent],
  template: `
    <div class="min-h-screen bg-background">
      <div class="flex h-screen">
        <app-sidebar 
          [isOpen]="sidebarOpen" 
          (onClose)="setSidebarOpen(false)">
        </app-sidebar>

        <div class="flex-1 flex flex-col overflow-hidden">
          <app-header (onMenuClick)="setSidebarOpen(true)"></app-header>
          <app-teacher-content></app-teacher-content>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TeacherDashboardComponent {
  sidebarOpen = false;

  setSidebarOpen(open: boolean): void {
    this.sidebarOpen = open;
  }
}