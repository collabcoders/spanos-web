import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEventType, HttpEvent, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { map, tap, last, catchError } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  public progressSource = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  // upload(file: File): Observable<any> {
  //   var formData: any = new FormData();
  //   formData.append('avatar', file);
  //   return this.http
  //     .post('https://api.spanos.family/Upload', formData, {
  //       reportProgress: true,
  //       observe: 'events',
  //     })
  //     .pipe(catchError(this.errorMgmt));
  // }
  // errorMgmt(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     errorMessage = error.error.message;
  //   } else {
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }

  upload(file: File) {
    var formData: FormData = new FormData();
    formData.append("avatar", file);

    const req = new HttpRequest(
      "POST",
      "https://api.spanos.family/Upload", 
      formData,
      {
        headers: new HttpHeaders({ 'content-type': 'multipart/form-data' }),
        reportProgress: true,
        responseType: 'json',
      });

    return this.http.request(req).pipe(
      // map(event => {
      //   console.log('EVENT ==> ', event);
      //   debugger;
      // }),
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
  }

  processProgress(envelope: any): void {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    console.log(event);
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file...`;
       // return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total!);
      case HttpEventType.Response:
        console.log('response->',event);
        if (!event.body.success) {
          return `Server Error: ` + event.body.message;
        } else {
          return event.body.data;
        }
      default:
        return ``;
        //return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
}
