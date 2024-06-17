import { Routes } from '@angular/router';

import { authGuard } from './core/auth/guards/auth.guard';
import { AlreadyLoggedInGuard } from './core/auth/guards/already-logged-in.guard';


export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../app/core/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    data: { permissions: ['ASSOCIATE', 'ADMIN']},
    children: [
      {
        path: '',
        redirectTo: '/profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        data: { permissions: ['ASSOCIATE', 'ADMIN']},
        canActivate: [authGuard],
        loadComponent: () => import('./core/profile/profile-component/profile.component').then(m => m.ProfileComponent),
      },
      {
        path: 'doctors',
        data: { permissions: ['ASSOCIATE', 'ADMIN']},
        canActivate: [authGuard],
        loadComponent: () => import('./core/doctors/doctors-list/doctors-list.component').then(m => m.DoctorsListComponent),
      },
      {
        path: 'units',
        data: { permissions: ['ASSOCIATE', 'ADMIN']},
        canActivate: [authGuard],
        loadComponent: () => import('./core/units/units-list/units-list.component').then(m => m.UnitsListComponent),
      },
      {
        path: 'specialties',
        data: { permissions: ['ADMIN']},
        canActivate: [authGuard],
        loadComponent: () => import('./core/specialties/specialties-list/specialties-list.component').then(m => m.SpecialtiesListComponent),
      },
      {
        path: 'associates',
        data: { permissions: ['ADMIN']},
        canActivate: [authGuard],
        loadComponent: () => import('./core/associates/associates/associates-list.component').then(m => m.AssociatesListComponent),
      },
    ]
   },
  {
    path: 'login',
    canActivate: [AlreadyLoggedInGuard],
    loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent),
  }
];
