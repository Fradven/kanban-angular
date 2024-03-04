import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUserDto } from '../../../core/models/user.model';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  constructor(private router: Router, private userService: UserService) {}

  public back(): void {
    this.router.navigateByUrl('/login');
  }

  public register(user: IUserDto): void {
    this.userService.saveUser(user);
    this.router.navigateByUrl('/home');
  }
}
