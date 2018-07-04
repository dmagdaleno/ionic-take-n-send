import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from '../../app/model/picture';
import { Observable } from 'rxjs/Observable';
import { RequestWrapper } from '../../app/model/request-wrapper';

@Injectable()
export class PictureServiceProvider {

  private apiUrl: string = 'http://localhost:8080/api';

  constructor(public _http: HttpClient) {
  }

  send(picture: Picture): Observable<any> {
    let body: RequestWrapper = this.buildRequestBody(picture);
    return this._http
      .post<any>(this.apiUrl.concat('/send'), body)
        .do(() => picture.sent = true)
  }

  buildRequestBody(picture: Picture): RequestWrapper {
    return {
      service: 'ENROLL', 
      document: picture.document,
      docType: picture.documentType,
      image: picture.base64,
      contract: '12345ABC',
      product: 'QUERYONESKYO',
      gallery: 'whitelist'
    };
  }

}
