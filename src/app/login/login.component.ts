import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from './services/login.service';
import { Credentials } from './models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  isLoading = false;
  subscription: Subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(credencials: Credentials): void {
    this.isLoading = true;
    const loginSubscription$ = this.loginService.login(credencials).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['home']);
      },
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
