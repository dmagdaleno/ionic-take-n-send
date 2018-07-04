import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Loading, Alert } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Mock } from '../../app/model/mock'
import { Picture } from '../../app/model/picture';
import { PictureServiceProvider } from '../../providers/picture-service/picture-service';
import { HttpErrorResponse } from '@angular/common/http';

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
    private pictureService: PictureServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _sanitizer: DomSanitizer) {

      this.picture = {
        base64: '',
        name: '',
        documentType: '',
        document: '',
        birthDate: '',
        sent: false
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

    let loading: Loading = this.startLoading();

    let alert: Alert = this.buildAlert();
    let title: string = '';
    let message: string = '';

    this.pictureService.send(this.picture)
      .finally(() => {
        alert.setTitle(title);
        alert.setSubTitle(message);
        alert.present();
      })  
      .subscribe(success => {
        console.log(success);
        loading.dismiss();
        title = 'SUCESSO';
        message = 'Foto enviada com sucesso!';
      }, 
      (error: HttpErrorResponse) => {
        console.log(error);
        loading.dismiss();
        title = 'ERRO';
        message = 'Não foi possível enviar a foto';
      });
    
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

  private startLoading(): Loading{
    let loading:Loading = this._loadingCtrl.create({
      content: 'Enviando foto...'
    });

    loading.present();

    return loading;
  }

  buildAlert(): Alert {
    return this._alertCtrl.create({
      buttons: [{text: 'Ok'}]
    });
  }
}
