import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'behavior',
    loadComponent: () => import('./components/behavior-counter.component').then(m => m.BehaviorCounterComponent)
  },
  {
    path: 'signal',
    loadComponent: () => import('./components/signal-counter.component').then(m => m.SignalCounterComponent)
  }
];
