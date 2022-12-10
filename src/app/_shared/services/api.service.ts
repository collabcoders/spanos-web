import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Config } from '@shared/config';
// import { SpinnerService } from './spinner.service';
// import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  setHeader(auth: boolean): HttpHeaders {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    if (!auth) {
      header = header.append(Config.noAuthHeader, '');
    }
    return header;
  }

  get(path: string, message?: string, auth = true): Observable<any> {
    //this.spinner.show();
    return this.http.get(Config.apiBaseUrl + '/' + path, {headers: this.setHeader(auth)})
      .pipe(
        tap(() => this.handleSuccess(message)),
        catchError((err: any) => this.handleError(err)),
        finalize(()=> {
          // this.spinner.hide();
        })
    )
  }

  post(path: string, payload: any, message?: string, auth = true): Observable<any> {
    //this.spinner.show()
    return this.http.post(Config.apiBaseUrl + '/' + path, payload, {headers: this.setHeader(auth)})
      .pipe(
        tap(() => this.handleSuccess(message)),
        catchError((err: any) => this.handleError(err)),
        finalize(()=> {
            // this.spinner.hide();
        })
    );
  }

  delete(path: string, message?: string): Observable<any> {
    //this.spinner.show()
    return this.http.delete(Config.apiBaseUrl + '/' + path, {headers: this.setHeader(true)})
      .pipe(
        tap(() => this.handleSuccess(message)),
        catchError((err: any) => this.handleError(err)),
        finalize(()=> {
          // this.spinner.hide();
        })
    );
  }

  patch(path: string, payload: any, message?: string, auth = false): Observable<any> {
    // this.spinner.show()
    return this.http.patch(Config.apiBaseUrl + '/' + path, payload, {headers: this.setHeader(true)})
      .pipe(
        tap(() => this.handleSuccess(message)),
        catchError((err: any) => this.handleError(err)),
        finalize(()=> {
          // this.spinner.hide();
        })
    );
  }

  put(path: string, payload: unknown, message?: string, auth = false): Observable<any> {
    // this.spinner.show()
    return this.http.put(Config.apiBaseUrl + '/' + path, payload, {headers: this.setHeader(true)})
      .pipe(
        tap(() => this.handleSuccess(message)),
        catchError((err: any) => this.handleError(err)),
        finalize(()=> {
          // this.spinner.hide();
        })
    );
  }

  private handleSuccess(message?: string) {
    if (message) {
      //this.toast.success(message)
    }
  }

  private handleError(err: HttpErrorResponse) {
    let message = 'Error, something went Wrong.';
    if (err.error) {
      message = (err.error && typeof err.error === 'string') ? err.error : err.error.ErrorMessage ? err.error.ErrorMessage : err.message;
    }
    //this.toast.error(message)
    return of(err.status);
  }

}
