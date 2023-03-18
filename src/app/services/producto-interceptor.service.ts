import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';

TokenService;
@Injectable({
  providedIn: 'root',
})
export class ProductoInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let autReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      autReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    return next.handle(autReq);
  }

  constructor(private tokenService: TokenService) { }
}

export const interceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ProductoInterceptorService,
    multi: true,
  },
];
