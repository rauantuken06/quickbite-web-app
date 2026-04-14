import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register)
  },
  {
    path: 'menu',
    // canActivate: [authGuard],
    loadComponent: () => import('./pages/menu/menu').then((m) => m.Menu)
  },
  {
    path: 'cart',
    //canActivate: [authGuard],
    loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart)
  },
  {
    path: 'orders',
    // canActivate: [authGuard],
    loadComponent: () => import('./pages/orders/orders').then((m) => m.Orders)
  },
  {
    path: 'orders/:id',
    // canActivate: [authGuard],
    loadComponent: () => import('./pages/order-details/order-details').then((m) => m.OrderDetails)
  },
  {
    path: 'admin/dishes',
    // canActivate: [authGuard],
    loadComponent: () => import('./pages/admin-dishes/admin-dishes').then((m) => m.AdminDishes)
  },
  { path: '**', redirectTo: 'menu' }
];