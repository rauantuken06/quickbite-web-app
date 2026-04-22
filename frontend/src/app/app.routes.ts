import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

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
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'categories', loadComponent: () => import('./pages/admin-categories/admin-categories').then((m) => m.AdminCategories) },
      { path: 'dishes', loadComponent: () => import('./pages/admin-dishes/admin-dishes').then((m) => m.AdminDishes) },
      { path: 'orders', loadComponent: () => import('./pages/admin-orders/admin-orders').then((m) => m.AdminOrders) }
    ]
  },
  {
    path: 'account',
    //canActivate: [authGuard],
    loadComponent: () => import('./pages/account/account').then((m) => m.Account)
  },
  {
    path: 'order-completion',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/order-completion/order-completion').then((m) => m.OrderCompletion)
  },
  { path: '**', redirectTo: 'menu' },
];