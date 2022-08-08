import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AppConfigService } from '../services/appConfigService';

/** Authorization interceptor. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private readonly appConfig: AppConfigService,
  ) {}

  /**
   * Adds to requests api-key.
   * @param req Request.
   * @param next Request handler.
   */
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = req.clone({
      headers: req.headers.set('Api-Key', this.appConfig.apiKey),
    });
    return next.handle(authReq);
  }
}
