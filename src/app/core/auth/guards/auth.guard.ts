import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export function authGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const authService = inject(AuthService);
  const user = authService.currentUserSig();
  const router = inject(Router);

  if(!user){
    router.navigate(['/login']);
    return false;
  }

  const expectedRoles: Array<string> = route.data['permissions'];
  const currentRole = user.role;

  return expectedRoles.includes(currentRole);
}
