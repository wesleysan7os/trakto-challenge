import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
export class AppRoutingModule {}
