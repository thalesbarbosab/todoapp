import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertCtrl : AlertController) {}

  async add(){
    const alert = await this.alertCtrl.create({
      header: 'O que deseja fazer?',
      inputs:[
        {
          name: 'task',
          type: 'text',
          placeholder: 'Estudar Ionic5'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Clicado no botão cancelar')
          }
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            //this.add(form.task)
          }
        }
      ]
    });
    await alert.present();
  }
}
