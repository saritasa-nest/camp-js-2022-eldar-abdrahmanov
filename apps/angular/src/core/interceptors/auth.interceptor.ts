import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { map, Observable, switchMap } from 'rxjs';

import { TokenService } from '../services/token.service';

import { AppConfigService } from '../services/appConfig.service';
import { UserService } from '../services/user.service';

/** Authorization interceptor. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private readonly appConfig: AppConfigService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * Adds to requests authorization.
   * @param req Request.
   * @param next Request handler.
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith(new URL('auth', this.appConfig.apiUrl).toString())) {
      return next.handle(req);
    }
    return this.tokenService.getToken().pipe(
      map(token => {
        if (token === null) {
          return req;
        }
        return req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
      }),
      switchMap(clonedRequest => next.handle(clonedRequest)),
    );
  }
}
