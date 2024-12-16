import { Routes } from '@angular/router';

export const uniconnectRoutes: Routes = [
  {
    path: 'uniconnect',
    loadComponent: () => import('./uniconnect-list/uniconnect-list.component').then(m => m.UniconnectListComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./user-profile/user-profile.component').then(m => m.UserProfileComponent),
  }
]