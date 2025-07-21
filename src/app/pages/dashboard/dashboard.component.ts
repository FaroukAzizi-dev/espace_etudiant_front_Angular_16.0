import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { AuthServiceService } from '../../core/auth/auth-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
   authToken: string | null = null;

  constructor(private router: Router, private authService: AuthServiceService) {
    this.authToken = authService.getToken(); // Retrieve token for display
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
