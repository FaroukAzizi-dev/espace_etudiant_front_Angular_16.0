import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }
  
  // Clear any stale session data
  authService.clearSession();
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
