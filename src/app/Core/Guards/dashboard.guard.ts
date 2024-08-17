import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('userToken') !== null) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
