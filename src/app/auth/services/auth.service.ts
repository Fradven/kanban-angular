import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { IUserDto } from '../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: IUserDto | undefined;

  constructor(private userService: UserService) { }

  public login(email: string, password: string): void {
    const userExist = this.userService.getUserByEmail(email);

    if (userExist && userExist.password === password) {
      this._user = userExist;
    } else {
      throw new Error("Utilisateur ou mot de passe incorrect");
    }
  }

  public logout(): void {
    this._user = undefined;
  }

  public get isLoggedIn(): boolean {
    return this._user !== undefined;
  }

  public get userLoggedFullName(): string | undefined {
    return this._user ? this._user?.firstname + ' ' + this._user?.lastname : undefined;
  }
}
