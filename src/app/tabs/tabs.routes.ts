import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'pass',
        loadComponent: () =>
          import('../pass/pass.page').then((m) => m.PassPage),
      },
      {
        path: 'bridge',
        loadComponent: () =>
          import('../bridge/bridge.page').then((m) => m.BridgePage),
      },
      {
        path: 'info',
        loadComponent: () =>
          import('../info/info.page').then((m) => m.InfoPage),
      },
      {
        path: '',
        redirectTo: '/tabs/pass',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/pass',
    pathMatch: 'full',
  },
];
