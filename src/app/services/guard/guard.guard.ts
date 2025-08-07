import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import { inject } from '@angular/core';

export const authGuard = (requiredRole?: string): CanActivateFn => (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  // 1. Not logged in → redirect to login
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  // 2. Role check (only if requiredRole is specified)
  if (requiredRole && authService.getUserRole() !== requiredRole) {
    const userRole = authService.getUserRole();

    switch (userRole) {
      case 'admin':
        return router.createUrlTree(['/admin-dashboard']);
      case 'teacher':
        return router.createUrlTree(['/enseignant-dashboard']);
      case 'student':
      default:
        return router.createUrlTree(['/student']);
    }
  }

  // 3. Passed all checks → allow navigation
  return true;
};
