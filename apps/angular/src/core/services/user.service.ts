import { Injectable } from '@angular/core';

/** User service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  /** User login state. */
  public isLoggedIn!: boolean;

  /**
   * Handle user login.
   * @param jwt User authorization token.
   */
  public handleLogin(jwt: string): void {
    localStorage.setItem('jwt', jwt);
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
