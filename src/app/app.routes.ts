import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { authGuard } from './services/guard/guard.guard';
import { StudentDashboardComponent } from './views/student-contentdashboard/student-contentdashboard.component';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
import { TeacherDashboardComponent } from './views/teacher-dashboard/teacher-dashboard.component';
import { TeacherContentComponent } from './views/teacher-dashboard/teacher-content/teacher-content.component';
import { TeacherSubjectsComponent } from './views/teacher-dashboard/teacher-subjects/teacher-subjects.component';
import { TeacherAbsencesComponent } from './views/teacher-dashboard/teacher-absences/teacher-absences.component';
import { NoteFormComponent } from './views/teacher-dashboard/note-form/note-form.component';
import { TeacherScheduleComponent } from './views/teacher-dashboard/teacher-schedule/teacher-schedule.component';

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
    canActivate: [authGuard('teacher')],
    children: [
      // Route par défaut - affiche le contenu principal du dashboard
      { path: '', component: TeacherContentComponent },
      
      // Route pour les matières
      { path: 'subjects', component: TeacherSubjectsComponent },
      { path: 'absences', component: TeacherAbsencesComponent },
      { path: 'grades', component: NoteFormComponent },
      { path: 'schedule', component: TeacherScheduleComponent },
      
      // Ajoutez d'autres routes enfant au besoin
      // { path: 'grades', component: TeacherGradesComponent },
      // { path: 'absences', component: TeacherAbsencesComponent },
    ]
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