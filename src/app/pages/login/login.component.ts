import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from './services/login.service';
import { Credentials } from './models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  isLoading = false;
  subscription: Subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  onSubmit(credencials: Credentials): void {
    this.isLoading = true;
    const loginSubscription$ = this.loginService.login(credencials).subscribe(
      () => setTimeout(() => (this.isLoading = false), 3000), // apenas para mostrar o spinner
      (error) => {
        this.toastr.error('Verifique seu login', '', { progressBar: true });
        console.log(error);
        this.isLoading = false;
      }
    );

    this.subscription.add(loginSubscription$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
