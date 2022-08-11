import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { Injectable } from '@angular/core';

/**  */
@Injectable()
export class DetailsGuard implements CanActivate {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /**
   *
   * @param _route .
   * @param _state
   */
  public canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    console.log(this.userService.isLoggedIn)
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['login/']);
    }
    return this.userService.isLoggedIn;
  }
}
