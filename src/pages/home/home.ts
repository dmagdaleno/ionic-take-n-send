import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';

import { Mock } from '../../app/model/mock'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imageView: SafeHtml;
  imageReady: Boolean = false;

  name: string = '';
  documentType: string = '';
  document: string = '';
  gender: string = '';
  imageBase64: string = '';

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private sanitizer: DomSanitizer) { }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageBase64 = imageData;
      this.imageView = this.sanitizer
        .bypassSecurityTrustResourceUrl('data:image/png;base64,' + imageData);
      this.imageReady = true;
    }, (err) => {
      console.log(err);
      var mock: Mock = new Mock();
      this.imageView = this.sanitizer
        .bypassSecurityTrustResourceUrl(mock.base64);
      this.imageReady = true;
    });
  }

  avancar(){
    console.log('clicou em avançar');
  }
}
