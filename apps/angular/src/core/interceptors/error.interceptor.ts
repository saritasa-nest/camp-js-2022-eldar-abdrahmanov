import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

/** */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /** */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.status === 400) {
          console.log(error.error.data)
        }

          return throwError(errorMessage);
      }))
  }
}
