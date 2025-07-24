import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { guardGuard } from './services/guard/guard.guard';
import { StudentDashboardComponent } from './views/student-contentdashboard/student-contentdashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: StudentDashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Optional default route
  { path: '**', redirectTo: '/login' } // Optional catch-all route
];