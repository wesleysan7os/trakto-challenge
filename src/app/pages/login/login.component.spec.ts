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

  it('should be empty when no credencials are provided', () => {
    const email: HTMLElement = fixture.debugElement.query(By.css('[type="email"]')).nativeElement;
    const password: HTMLElement = fixture.debugElement.query(By.css('[type="password"]')).nativeElement;

    expect(email.nodeValue).toBeNull();
    expect(password.nodeValue).toBeNull();
  });

  it('should be disabled with non-provided credencials', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    const email: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#email');
    const password: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#password');

    email.dispatchEvent(new Event('focus'));
    email.dispatchEvent(new Event('blur'));
    password.dispatchEvent(new Event('focus'));
    password.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const element = fixture.debugElement.nativeElement;
      // const submitButton: HTMLButtonElement = element.query(By.css('#submit')).nativeElement;
      const submitButton: HTMLButtonElement = element.querySelector('button');
      expect(submitButton.disabled).toBeTruthy();
      // expect(submitButton.attributes['disabled'].value).toBeTruthy();
    });
  });
  });

  it('should be disabled with irregular credencials', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;
    const submitButton: HTMLButtonElement = element.querySelector('button');
    // expect(submitButton.attributes['disabled'].value).toBeTruthy();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should update the input values', () => {
    const email: HTMLElement = fixture.debugElement.query(By.css('[type="email"]')).nativeElement;
    const password: HTMLElement = fixture.debugElement.query(By.css('[type="password"]')).nativeElement

    email.nodeValue = 'fulano@gmail.com';
    password.nodeValue = 'trakto123';

    fixture.detectChanges();

    expect(email.nodeValue).toEqual('fulano@gmail.com');
    expect(password.nodeValue).toEqual('trakto123');
  })
});
