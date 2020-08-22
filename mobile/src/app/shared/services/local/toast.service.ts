import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  presentToast(message : string , color : string ) {
    const toast = this.toastController.create({
      message: message ,
      duration: 2000 ,
      cssClass : color
    });
    toast.then(toast => toast.present());
  }

}
