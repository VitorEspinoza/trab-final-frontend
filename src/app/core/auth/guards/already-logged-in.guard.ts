import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export function AlreadyLoggedInGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUserSig();
    if (user) {
      router.navigate(['']);
      return false;
    }
    return true;
}
