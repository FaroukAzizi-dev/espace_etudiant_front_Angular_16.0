import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const AuthService = inject(AuthServiceService);
  const router = inject(Router);

  if(AuthService.isAuthenticated()){
    console.log('authGuard: User is authenticated. Allowing navigation.');
    return true;
  }
  else{
    console.log('authGuard: User is NOT authenticated. Redirecting to /login.');
    router.navigate(['/login']);
    return false;
  }
};
