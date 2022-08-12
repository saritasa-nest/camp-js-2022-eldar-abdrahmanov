import { Injectable } from '@angular/core';

import { TokenService } from './token.service';

/** User service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  /** User login state. */
  public isLoggedIn!: boolean;

  public constructor(private readonly tokenService: TokenService) {}

  /**
   * Handle user login.
   * @param jwt User authorization token.
   */
  public handleLogin(jwt: string): void {
    this.tokenService.saveToken('jwt', jwt);
    this.isLoggedIn = true;
  }

  /** Handle user logout. */
  public handleLogOut(): void {
    this.isLoggedIn = false;
  }

  /** Get token from local storage. */
  public getJwtFromLocalStorage(): string | null {
    return localStorage.getItem('jwt');
  }
}
