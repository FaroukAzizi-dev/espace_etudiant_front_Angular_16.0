import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { authGuard } from './services/guard/guard.guard';
import { StudentDashboardComponent } from './views/student-contentdashboard/student-contentdashboard.component';
<<<<<<< HEAD
import { ReclamationComponent } from './views/reclamation/reclamation.component';
import { ListeReclamationsComponent } from './views/listereclamations/listereclamations/listereclamations.component';
import { DocumentstageComponent } from './views/documentstage/documentstage.component';
import { LettreformComponent } from './views/lettreform/lettreform.component';
import { StudentScheduleComponent } from './views/studentschedule/studentschedule.component';
import { EventService } from './services/event/event.service';
import { EventListComponent } from './views/event/eventlist/eventlist.component';
import { InternshipOfferListComponent } from './views/internship/internshipofferlist/internshipofferlist.component';
export const routes: Routes = [
  { path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'dashboard', 
    component: StudentDashboardComponent, 
    canActivate : [guardGuard],
    children : [
      {
        path : 'reclamation' , component : ReclamationComponent 
      }, 
      {
        path: 'listereclamation' , component: ListeReclamationsComponent
      },
      { 
        path: 'documentstage',
        children: [
          { path: '', component: DocumentstageComponent }, 
          { path: 'lettreaffectation', component: LettreformComponent }
        ]
      },
      {
        path: 'emploidetemps' , component: StudentScheduleComponent
      },
      {
        path: 'evenements' , component: EventListComponent
      },
      {
        path: 'offres-stage' , component : InternshipOfferListComponent
      }
    ]
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  }, // Optional default route
  { 
    path: '**', 
    redirectTo: '/login' 
  } // Optional catch-all route

=======
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
>>>>>>> origin/said2
];