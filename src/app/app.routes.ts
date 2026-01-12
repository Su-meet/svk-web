import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'SVK Experts - Home Service Experts at Your Doorstep'
    },
    {
        path: 'services',
        loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
        title: 'All Services | SVK Experts'
    },
    {
        path: 'services/:category',
        loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent)
    },
    {
        path: 'service/:slug',
        loadComponent: () => import('./pages/service-detail/service-detail.component').then(m => m.ServiceDetailComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
        title: 'Cart | SVK Experts'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
