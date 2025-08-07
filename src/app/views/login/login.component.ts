import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  getLogoPath(): string {
    return '/assets/images/logo.png'; 
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    console.log('Tentative de connexion avec:', this.loginForm.value.username);

    this.authService.login({
      login: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe({
      next: (res) => {
        const userRole = this.authService.getUserRole();
        console.log('Rôle déterminé:', userRole);
        
        switch(userRole) {
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'teacher':
            this.router.navigate(['/enseignant-dashboard']);
            break;
          case 'student':
          default:
            this.router.navigate(['/student']);
            break;
        }
      },
      error: (err) => {
        console.error('Échec de la connexion:', err);
        this.errorMessage = 'Invalid credentials or connection issue';
        this.isLoading = false;
      }
    });
  }
}