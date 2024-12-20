import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'auth',
        loadChildren: () =>
            import('./auth/features/auth.routes').then((m) => m.authRoutes),
    },
    {
        path:'',
        loadChildren: () =>
            import('./uniconnect/uniconnect.routes').then((m) => m.uniconnectRoutes),
    },
];
