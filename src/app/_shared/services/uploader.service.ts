import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEventType, HttpEvent, HttpHeaders } from "@angular/common/http";
import { map, tap, last } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Config } from "@shared/config";
import { environment } from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  public progressSource = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  upload(file: File) {
    var formData: FormData = new FormData();
    formData.append("avatar", file);

    const req = new HttpRequest(
      "POST",
      environment.api + "/Upload", 
      formData,
      {
        headers: new HttpHeaders({ 'content-type': 'multipart/form-data' }),
        reportProgress: true,
        responseType: 'json',
      });
    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
  }

  processProgress(envelope: any): void {
    if (typeof envelope === "number") {
      console.log(envelope);
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file...`;
        //return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total!);
      case HttpEventType.Response:
        if (!event.body.success) {
          return `Server Error: ` + event.body.message;
        } else {
          return event.body.data;
        }
        // if (event.body.error) {
        //   return `Server Error: ` + event.body.msg;
        // } else {
        //   return event.body.data;
        //   debugger;
        // }
      default:
        return ``;
        //return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
}
