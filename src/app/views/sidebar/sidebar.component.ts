import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(   
    private authService: AuthServiceService,
    private router: Router
  ) {}

  menuItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/profile', icon: 'person', label: 'Profile' },
    { path: '/courses', icon: 'school', label: 'Courses' },
    { path: '/grades', icon: 'grade', label: 'Grades' }
  ]



}
