import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { RouterModule } from '@angular/router'; // ✅ import RouterModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  loginSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router // Injected to navigate after successful login
  ) {
    // Using Angular's Reactive Forms for robust validation
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], // Assuming login is an email
      password: ['', [Validators.required]]
    });
  }

  /**
   * Handles the form submission.
   */
  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      console.warn('%c[LOGIN] Form submission prevented - invalid form', 'color: #FF9800; font-weight: bold', this.loginForm.value);
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.loginSuccess = false;

    const credentials = {
      login: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    console.log('%c[LOGIN] Attempting login with credentials', 'color: #4CAF50; font-weight: bold', {
      username: credentials.login,
      password: '•••••••' // Don't log actual password
    });

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response?.result) {
          console.log('%c[LOGIN] Login successful - redirecting to dashboard', 'color: #4CAF50; font-weight: bold', response);
          this.isLoading = false;
          this.loginSuccess = true;
          this.router.navigate(['/dashboard']);
        } else {
          console.warn('%c[LOGIN] Login response missing expected result', 'color: #FF9800; font-weight: bold', response);
          this.isLoading = false;
          this.errorMessage = 'Invalid server response';
        }
      },
      error: (err) => {
        console.error('%c[LOGIN] Login error occurred', 'color: #F44336; font-weight: bold', err);
        this.isLoading = false;
        this.errorMessage = err.message;
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      console.log('%c[LOGIN] Found existing session - clearing and reloading', 'color: #2196F3; font-weight: bold');
      this.authService.clearSession();
      window.location.reload();
    }
  }
}