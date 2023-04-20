import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { appRoutes } from './routes';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, LoginComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
