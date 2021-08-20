import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { retry, catchError } from 'rxjs/operators';
  
  export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          retry(1),
          catchError((errorRes: HttpErrorResponse) => {
            let errorMessage = '';
            if (errorRes.error instanceof ErrorEvent) {
               errorMessage = `Error: ${errorRes.error.error.message}`;
            } else {
              switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'This email exists already';
                  break;
                case 'EMAIL_NOT_FOUND':
                  errorMessage = 'This email does not exist.';
                  break;
                case 'INVALID_PASSWORD':
                  errorMessage = 'This password is not correct.';
                  break;
              }
            }
            return throwError(errorMessage);
          })
        )
    }
  }