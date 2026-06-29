import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { UsersComponent } from './pages/users/users';
import { PaymentsComponent } from './pages/payments/payments';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'users',
    component: UsersComponent
  },

  {
    path: 'payments',
    component: PaymentsComponent
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];