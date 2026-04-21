import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../services/auth';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const token = authService.getToken();

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${ token }` } })
: req;

return next(authReq).pipe(
  catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
      authService.logout(false);
      router.navigate(['/login']);
    }
    return throwError(() => error);
  })
);
};