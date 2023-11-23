import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'test',
    loadComponent: () => import('./test/test.page').then( m => m.TestPage)
  },
];
