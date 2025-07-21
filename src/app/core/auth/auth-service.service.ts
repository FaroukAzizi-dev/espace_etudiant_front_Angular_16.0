import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  Login(email: string, cin: string): Observable<any> {
    const url = 'http://localhost:8070/api/student/login';

    const loginData = {
      email: email,
      cin: cin
    };

    return this.http.post(url, loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Method to store token
  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  // Method to get token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  //Method to logout
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Method to check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decode JWT to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }
}
