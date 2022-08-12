import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { UserService } from '../services/user.service';

/** Authorization guard. */
@Injectable()
export class AuthorizationGuard implements CanActivate {
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
    return this.userService.isLoggedIn$.pipe(map(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['login/']);
      }
      return isLoggedIn;
    }));
  }
}
