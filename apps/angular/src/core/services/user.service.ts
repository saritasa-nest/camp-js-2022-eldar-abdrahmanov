import { Injectable } from '@angular/core';

import { AuthorizationService } from './auth.service';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  /** */
  public isLoggedIn!: boolean;

  public constructor(private readonly auth: AuthorizationService) {}

  /** */
  public handleLogin(jwt: string): void {
    localStorage.setItem('jwt', jwt);
    this.isLoggedIn = true;
  }

  /**
   * Save jwt in local storage.
   */
  public handleLogOut(): void {
    this.isLoggedIn = false;
  }

  /** */
  public getJwtFromLocalStorage(): string | null {
    return localStorage.getItem('jwt');
  }
}
