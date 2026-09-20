import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'pedidos',
    loadComponent: () => import('./pages/pedidos-list/pedidos-list').then((m) => m.PedidosList),
    canActivate: [MsalGuard],
  },
  {
    path: 'pedidos/nuevo',
    loadComponent: () => import('./pages/pedido-form/pedido-form').then((m) => m.PedidoForm),
    canActivate: [MsalGuard],
  },
];
