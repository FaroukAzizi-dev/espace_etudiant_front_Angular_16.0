import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import { inject } from '@angular/core';

export const authGuard = (requiredRole?: string): CanActivateFn => (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  if (requiredRole && authService.getUserRole() !== requiredRole) {
    const userRole = authService.getUserRole();
    
    // Redirection selon le rôle de l'utilisateur
    switch(userRole) {
      case 'admin':
        return router.createUrlTree(['/admin-dashboard']);
      case 'teacher':
        return router.createUrlTree(['/enseignant-dashboard']);
      case 'student':
      default:
        return router.createUrlTree(['/student']);
    }
  }

  return true;
};