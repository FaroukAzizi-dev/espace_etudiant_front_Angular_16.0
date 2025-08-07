import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth/auth-service.service';

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

  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      console.warn('[LOGIN] Invalid form submission', this.loginForm.value);
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const credentials = {
      login: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    console.log('[LOGIN] Attempting login with:', {
      username: credentials.login,
      password: '•••••••'
    });

    this.authService.login(credentials).subscribe({
      next: () => {
        const userRole = this.authService.getUserRole();
        console.log('[LOGIN] User role:', userRole);

        switch (userRole) {
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

        this.isLoading = false;
      },
      error: (err) => {
        console.error('[LOGIN] Login failed:', err);
        this.errorMessage = err.message || 'Identifiants incorrects ou problème de connexion';
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      console.log('[LOGIN] Existing session detected - clearing');
      this.authService.clearSession();
      window.location.reload();
    }
  }
}
