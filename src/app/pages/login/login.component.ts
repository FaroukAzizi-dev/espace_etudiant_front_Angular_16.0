import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth/auth-service.service';
import { RouterModule } from '@angular/router'; // ✅ import RouterModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , RouterModule],
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
    // Mark all fields as touched to trigger validation messages
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return; // Stop if the form is invalid
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.loginSuccess = false;

    const credentials = {
      login: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // --- SUCCESS ---
        this.isLoading = false;
        this.loginSuccess = true;
        console.log('Successfully logged in!', response);

        // Optional: Store user info from the response (e.g., in a state management service)
        // const userInfo = response.result;

        // Navigate to the student dashboard or home page after a short delay
        setTimeout(() => {
          this.router.navigate(['/dashboard']); // Change to your target route
        }, 1500);
      },
      error: (err) => {
        // --- ERROR ---
        this.isLoading = false;
        this.loginSuccess = false;
        // The error message is already created in the service's handleError
        this.errorMessage = err.message;
        console.error('Login failed:', err);
      }
    });
  }
}