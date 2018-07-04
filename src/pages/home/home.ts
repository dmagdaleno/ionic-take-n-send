import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
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
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _sanitizer: DomSanitizer) {

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
      this.imageView = this._sanitizer
        .bypassSecurityTrustResourceUrl('data:image/png;base64,' + imageData);
      this.imageReady = true;
    }, (err) => {
      console.log(err);
      var mock: Mock = new Mock();
      this.picture.base64 = mock.base64;
      this.imageView = this._sanitizer
        .bypassSecurityTrustResourceUrl(mock.base64);
      this.imageReady = true;
    });
  }

  send(){
    if(this.isThereBlankField()){
      this._alertCtrl.create({
        title: 'Campo obrigatório',
        subTitle: 'Favor preencher todos os campos',
        buttons: [{text: 'Ok'}]
      }).present();
      return;
    }
    
  }

  private isThereBlankField(): Boolean {
    if(this.picture.base64 == '' ||
        this.picture.name  == '' ||
        this.picture.documentType == '' ||
        this.picture.document == '' ||
        this.picture.birthDate == ''){
          return true;
    }
    return false;
  }
}
