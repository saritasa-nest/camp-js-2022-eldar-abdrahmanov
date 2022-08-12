import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfigService } from '../services/appConfig.service';

/** Interceptor to add api key to request. */
@Injectable({
  providedIn: 'root',
})
export class ApiKeyInterceptor implements HttpInterceptor {

  public constructor(
    private readonly appConfig: AppConfigService,
  ) {}

  /**
   * Appends api key.
   * @param req Request.
   * @param next Request handler.
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req.clone({
      headers: req.headers.set('Api-Key', this.appConfig.apiKey),
    }));
  }
}
