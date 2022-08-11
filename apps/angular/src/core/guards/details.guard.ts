import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { UserService } from '../services/user.service';

/** Anime details component guard. */
@Injectable()
export class DetailsGuard implements CanActivate {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /**
   * Checks if the user is logged in. Redirects to the login page.
   * @param _route Route.
   * @param _state State.
   */
  public canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['login/']);
    }
    return this.userService.isLoggedIn;
  }
}
