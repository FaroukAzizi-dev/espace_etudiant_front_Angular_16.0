import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { guardGuard } from './services/guard/guard.guard';
import { StudentDashboardComponent } from './views/student-contentdashboard/student-contentdashboard.component';
import { ReclamationComponent } from './views/reclamation/reclamation.component';
import { ListeReclamationsComponent } from './views/listereclamations/listereclamations/listereclamations.component';
import { DocumentstageComponent } from './views/documentstage/documentstage.component';
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
        path: 'documentstage' , component: DocumentstageComponent
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

];