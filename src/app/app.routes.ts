
import { Routes } from '@angular/router';

import { authGuard } from './core/auth/guards/auth.guard';
import { AlreadyLoggedInGuard } from './core/auth/guards/already-logged-in.guard';


export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../app/core/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    data: { permissions: ['ASSOCIATE', 'ADMIN']},
    children: []
   },
  {
    path: 'login',
    canActivate: [AlreadyLoggedInGuard],
    loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent),
  }
];
