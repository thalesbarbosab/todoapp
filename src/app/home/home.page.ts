import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks : any[] = [];
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  async add() {
    const alert = await this.alertCtrl.create({
      header: 'O que deseja fazer?',
      inputs: [
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
            //debugador para analisar o comportamento da aplicacao
            //debugger;
            //console.log(form.task)
            this.addTask(form.task)
          }
        }
      ]
    });
    await alert.present();
  }
  async addTask(task: string) {
    //validar se existe o descritivo da tarefa
    if (task.trim().length == 0) {
      const toast = await this.toastCtrl.create({
        message: "Informe o que deseja fazer!",
        duration: 2000,
        position: 'middle',
        animated: true,
        color: 'danger'
      });
      toast.present();
      return;
    }
    let task2 = {name: task, done : false};
    this.tasks.push(task2);
    this.updateLocalStorage();
  }
  updateLocalStorage(){
    //Salvar dentro do localstorage do navegador
    //Muito utilizado em carrinhos de compra em determinados sites
    localStorage.setItem('task',JSON.stringify(this.tasks));
  }
  
}
