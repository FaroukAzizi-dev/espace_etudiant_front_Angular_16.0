import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { authGuard } from './services/guard/guard.guard';
import { StudentDashboardComponent } from './views/student-contentdashboard/student-contentdashboard.component';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
import { TeacherDashboardComponent } from './views/teacher-dashboard/teacher-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent,
    canActivate: [authGuard('admin')]
  },
  {
    path: 'enseignant-dashboard',
    component: TeacherDashboardComponent,
    canActivate: [authGuard('teacher')]
  },
  {
    path: 'student',
    component: StudentDashboardComponent,
    canActivate: [authGuard('student')]
  },
  // Routes de redirection pour compatibilité
  { 
    path: 'admin', 
    redirectTo: '/admin-dashboard', 
    pathMatch: 'full' 
  },
  {
    path: 'teacher',
    redirectTo: '/enseignant-dashboard',
    pathMatch: 'full'
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];