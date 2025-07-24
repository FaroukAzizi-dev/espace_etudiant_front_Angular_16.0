import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DashboardContentComponent } from '../dashboardcontent/dashboardcontent.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, DashboardContentComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="flex h-screen">
        <!-- Sidebar -->
        <app-sidebar 
          [isOpen]="sidebarOpen" 
          (onClose)="setSidebarOpen(false)">
        </app-sidebar>

        <!-- Main content area -->
        <div class="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <!-- Header -->
          <app-header (onMenuClick)="setSidebarOpen(true)"></app-header>

          <!-- Dashboard content -->
          <app-dashboard-content></app-dashboard-content>
        </div>
      </div>
    </div>
  `
})
export class StudentDashboardComponent {
  sidebarOpen = false;

  setSidebarOpen(open: boolean): void {
    this.sidebarOpen = open;
  }
}
