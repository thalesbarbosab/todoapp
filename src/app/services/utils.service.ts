import { ToastController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  public loading : HTMLIonLoadingElement;
  constructor(private toastCtrl : ToastController, private loadingCtrl : LoadingController) {  }
  async toast(message: string, duration: number = 2000, color : string = 'primary'){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom',
      cssClass: 'animated bounceInRight',
      animated: true,
      color: color
    });
    toast.present();
  }
  async showLoading(message : string = "Aguarde..."){
    let loading = await this.loadingCtrl.create({message : message});
    this.loading = loading;
    this.loading.present();
  }
  async hideLoading(){
    console.log(this.loading);
    if(this.loading != undefined && this.loading != null){
      this.loading.dismiss();
    }
  }
}
