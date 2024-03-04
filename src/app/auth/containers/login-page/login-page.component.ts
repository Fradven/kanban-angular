import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { Router } from '@angular/router';
import { LoginFormValue } from '../../models/login-form-value';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  // DI in angular
  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigateByUrl('register');
  }

  onLogin(formValue: LoginFormValue): void {
    console.log('GO TO LOGIN', formValue);
  }
}
