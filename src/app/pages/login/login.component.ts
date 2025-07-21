import { Component, inject , Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../core/auth/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  cin: string = '';
  AuthService: AuthServiceService;
  loginError: string = '';
  isLoading: boolean = false;

  constructor(AuthService: AuthServiceService , private router : Router) {
    this.AuthService = AuthService;
  }

  onLogin() {
    this.loginError = '';
    this.isLoading = true;

    if (!this.email || !this.cin) {
      this.loginError = 'Email and CIN are required';
      this.isLoading = false;
      return;
    }

    this.AuthService.Login(this.email, this.cin).subscribe({
      next: (response: any) => { // Use 'any' for now, or define a proper interface for Odoo JSON-RPC responses
        this.isLoading = false;
        // Check if the Odoo JSON-RPC response contains an error in the 'result' field
        if (response && response.result && response.result.error) {
          this.loginError = response.result.error; // Access the error from 'result'
          console.error('Login failed:', response.result.error);
        } else if (response && response.result && response.result.token) {
          // This is a successful login with a token
          console.log('Login successful:', response);
          this.AuthService.setToken(response.result.token);
          this.router.navigate(['/dashboard']);
        } else {
          // Handle unexpected successful response format
          this.loginError = 'An unexpected response was received.';
          console.error('Unexpected successful login response:', response);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login failed:', error);

        if (error.status === 0) {
          this.loginError = 'Network error. Please check your connection.';
        } else if (error.status >= 500) {
          this.loginError = 'Server error. Please try again later.';
        } else if (error.error && error.error.error) {
          // This handles non-JSON-RPC errors where the error is directly in error.error
          this.loginError = error.error.error;
        } else {
          this.loginError = 'Login failed. Please try again.';
        }
      }
    });
  }
}