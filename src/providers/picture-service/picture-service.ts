import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PictureServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PictureServiceProvider Provider');
  }

}
