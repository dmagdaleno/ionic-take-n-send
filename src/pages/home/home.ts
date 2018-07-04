import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Mock } from '../../app/model/mock'
import { Picture } from '../../app/model/picture';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imageView: SafeHtml;
  imageReady: Boolean = false;

  picture: Picture;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private sanitizer: DomSanitizer) {

      this.picture = {
        base64: '',
        name: '',
        documentType: '',
        document: '',
        birthDate: ''
      }
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(options).then((imageData) => {
      this.picture.base64 = imageData;
      this.imageView = this.sanitizer
        .bypassSecurityTrustResourceUrl('data:image/png;base64,' + imageData);
      this.imageReady = true;
    }, (err) => {
      console.log(err);
      var mock: Mock = new Mock();
      this.picture.base64 = mock.base64;
      this.imageView = this.sanitizer
        .bypassSecurityTrustResourceUrl(mock.base64);
      this.imageReady = true;
    });
  }

  send(){
    console.log('picture.base64: ' + this.picture.base64.substr(0,30).concat('...'));
    console.log('picture.name: ' + this.picture.name);
    console.log('picture.documentType: ' + this.picture.documentType);
    console.log('picture.document: ' + this.picture.document);
    console.log('picture.birthDate: ' + this.picture.birthDate);
  }
}
