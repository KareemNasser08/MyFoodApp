import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/Services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
   let _AuthService = inject(AuthService);


  if (localStorage.getItem('userToken') !== null && _AuthService.role === 'SuperAdmin') {
    return true;
  } else {
    router.navigate(['/dashboard']);
    return false;
  }
};
