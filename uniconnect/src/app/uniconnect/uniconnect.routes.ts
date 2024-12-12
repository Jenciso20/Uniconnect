import { Routes } from '@angular/router';

export const uniconnectRoutes: Routes = [
  {
    path: 'uniconnect',
    loadComponent: () => import('./uniconnect-list/uniconnect-list.component').then(m => m.UniconnectListComponent),
  }
]