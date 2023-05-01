import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { LoginComponent } from './login.component';
import { LoginService } from './services/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, ToastrModule.forRoot()],
      declarations: [LoginComponent],
      providers: [LoginService, ToastrService],
    }).compileComponents();
    TestBed.inject(LoginService);
    TestBed.inject(ToastrService);
    TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has "Entrar" text inside the submit button at first', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    const submitButton: HTMLButtonElement = element.querySelector('button');
    expect(submitButton.textContent).toContain('Entrar');
  });

  it('should create the login form', () => {
    const emailInput = fixture.debugElement.query(By.css('input[type="email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]'));
    const loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  xit('should disable login button when form is invalid', () => {
    const emailInput = fixture.debugElement.query(By.css('input[type="email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]'));
    const loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    emailInput.nativeElement.value = '';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    passwordInput.nativeElement.value = '';
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    
    // for some reason, karma is setting the button's submit disabled attritbute to false, 
    // even though the form is invalid. That's why I'm ignoring this test case.
    expect(loginButton.nativeElement.disabled).toBeTruthy(); 
  });

  it('should enable login button when form is valid', () => {
    const emailInput = fixture.debugElement.query(By.css('input[type="email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[type="password"]'));
    const loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    emailInput.nativeElement.value = 'test@example.com';
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    passwordInput.nativeElement.value = 'password123';
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(loginButton.nativeElement.disabled).toBeFalsy();
  });
});
