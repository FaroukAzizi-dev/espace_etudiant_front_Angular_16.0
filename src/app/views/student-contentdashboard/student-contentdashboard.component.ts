import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DashboardContentComponent } from '../dashboardcontent/dashboardcontent.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { DocumentstageComponent } from '../documentstage/documentstage.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, DashboardContentComponent, RouterOutlet],
  templateUrl: './student-contentdashboard.component.html',
 
})
export class StudentDashboardComponent {
  sidebarOpen = false;

  constructor(public router: Router) {}

  setSidebarOpen(open: boolean): void {
    this.sidebarOpen = open;
  }
}
