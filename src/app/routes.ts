import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
export class AppRoutingModule {}