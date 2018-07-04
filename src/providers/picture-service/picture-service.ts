import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from '../../app/model/picture';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PictureServiceProvider {

  private apiUrl: string = 'http://hostvalidbio:8080/core';

  constructor(public _http: HttpClient) {
  }

  send(picture: Picture): Observable<any> {
    return this._http
      .post<any>(this.apiUrl.concat('/enroll'), picture)
        .do(() => picture.sent = true)
        .catch(() => Observable.of(new Error('Não foi enviar a foto')));
  }

}
