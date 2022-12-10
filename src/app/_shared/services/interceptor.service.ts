import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '@shared/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEventType<any>> {
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
          Authorization: `Bearer ${this.auth.getToken()}` 
        },
        url: `${req.url}`
      });
    }
    return next.handle(updatedRequest);
  }
}
