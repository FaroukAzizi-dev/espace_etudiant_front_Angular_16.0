import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import { inject } from '@angular/core';

export const authGuard = (requiredRole?: string): CanActivateFn => (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  // 1️⃣ Check if logged in
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  if (requiredRole && authService.getUserRole() !== requiredRole) {
    const userRole = authService.getUserRole();

    // Redirect based on their actual role
    switch (userRole) {
      case 'admin':
        return router.createUrlTree(['/admin-dashboard']);
      case 'teacher':
        return router.createUrlTree(['/enseignant-dashboard']);
      case 'student':
        return router.createUrlTree(['/student']);
      default:
        return router.createUrlTree(['/login']); // unknown role
    }
  }

  // ✅ All checks passed
  return true;
};
