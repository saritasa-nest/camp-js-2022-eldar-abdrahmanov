import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { AppConfigService } from '../services/appConfigService';

/** */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    //private auth: AuthService,
    private readonly appConfig: AppConfigService
  ) {}

  /** */
  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    //const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Api-Key', this.appConfig.apiKey),
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
