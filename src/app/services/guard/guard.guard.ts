import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Use createUrlTree instead of navigate for guards
  return router.createUrlTree(['/login']);
};
