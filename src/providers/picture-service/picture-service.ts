import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return Observable.of(picture);
  }

}
