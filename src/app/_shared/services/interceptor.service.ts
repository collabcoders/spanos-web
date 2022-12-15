import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '@shared/config';
import { TokenService } from '@shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private token: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let updatedRequest: HttpRequest<any>;
    if (req.headers.has(Config.noAuthHeader)) {
      console.log('skip authorization');
      req = req.clone({ headers: req.headers.delete(Config.noAuthHeader,'') });
      updatedRequest = req.clone({
        setHeaders: { 'Content-Type': 'application/json' },
        url: req.url
      });
    } else {
      console.log('intercepted');
      updatedRequest = req.clone({
        setHeaders: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${this.token.getToken()}` 
        },
        url: `${req.url}`
      });
    }
    return next.handle(updatedRequest);
  }
}
