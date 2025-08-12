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
import { ReclamationComponent } from './views/reclamation/reclamation.component';
import { ListeReclamationsComponent } from './views/listereclamations/listereclamations/listereclamations.component';
import { DocumentstageComponent } from './views/documentstage/documentstage.component';
import { LettreformComponent } from './views/lettreform/lettreform.component';
import { StudentScheduleComponent } from './views/studentschedule/studentschedule.component';
import { EventListComponent } from './views/event/eventlist/eventlist.component';
import { InternshipOfferListComponent } from './views/internship/internshipofferlist/internshipofferlist.component';
import { DashboardContentComponent } from './views/dashboardcontent/dashboardcontent.component';
import { EmploiListComponent } from './views/emploilist/emploilist.component';
import { AbsenceListComponent } from './views/absencelist_etudiant/absencelist/absencelist.component';


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
      { path: '', component: TeacherContentComponent },
      { path: 'subjects', component: TeacherSubjectsComponent },
      { path: 'absences', component: TeacherAbsencesComponent },
      { path: 'grades', component: NoteFormComponent },
      { path: 'schedule', component: TeacherScheduleComponent },
    ]
  },
  
  {
    path: 'student',
    component: StudentDashboardComponent,
    canActivate: [authGuard('student')],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard',
        children: [
          { path: '', component: DashboardContentComponent }, // Main dashboard view
          { path: 'reclamation', component: ReclamationComponent },
          { path: 'listereclamation', component: ListeReclamationsComponent },
          { path: 'documentstage', component: DocumentstageComponent },
          { path: 'documentstage/lettreaffectation', component: LettreformComponent },
          { path: 'emploidetemps', component: StudentScheduleComponent },
          { path: 'evenements', component: EventListComponent },
          { path: 'offres-stage', component: InternshipOfferListComponent },
          { path: 'offre-emploi' , component: EmploiListComponent},
          { path: 'absence' , component: AbsenceListComponent}
        ]
      }
    ]
  },
  
  // Compatibility redirects
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
  {
    path: 'dashboard', // For backward compatibility
    redirectTo: '/student/dashboard',
    pathMatch: 'full'
  },
  
  // Default routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];