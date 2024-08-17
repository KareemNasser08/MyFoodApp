import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/Services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
   let _AuthService = inject(AuthService);


  if (localStorage.getItem('userToken') !== null && _AuthService.role === 'SystemUser') {
    return true;
  } else {
    router.navigate(['/system']);
    return false;
  }

};
