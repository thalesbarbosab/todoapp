import { Component } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: any[] = [];
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private actionsheetCtrl: ActionSheetController) {
    //obtendo dados do localstorage
    let taskLocalStorage = localStorage.getItem('task')
    if (taskLocalStorage != null) {
      this.tasks = JSON.parse(taskLocalStorage);
    }
  }

  async create() {
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
            this.store(form.task)
          }
        }
      ]
    });
    await alert.present();
  }
  async store(task: string) {
    //validar se existe o descritivo da tarefa
    if (task.trim().length == 0) {
      const toast = await this.toastCtrl.create({
        message: "Informe o que deseja fazer!",
        duration: 1500,
        position: 'bottom',
        animated: true,
        color: 'danger'
      });
      toast.present();
      return;
    }
    else
    {
      let task2 = { name: task, done: false };
      this.tasks.push(task2);
      this.updateLocalStorage();
      const toast = await this.toastCtrl.create({
        message: "Tarefa adicionada!",
        duration: 1500,
        position: 'bottom',
        animated: true,
        color: 'light'
      });
      toast.present();
    }
  }
  updateLocalStorage() {
    //Salvar dentro do localstorage do navegador
    //Muito utilizado em carrinhos de compra em determinados sites
    localStorage.setItem('task', JSON.stringify(this.tasks));
  }
  async actions(task: any) {
    const actionsheet = await this.actionsheetCtrl.create({
      header: "O que deseja fazer?",
      buttons: [{
        text: task.done ? "Desmarcar" : "Marcar",
        icon: task.done ? "radio-button-off" : "checkmark-circle",
        handler: async () => {
          task.done = !task.done;
          this.updateLocalStorage();
          const toast = this.toastCtrl.create({
            message: task.done?"Tarefa concluída!":"Tarefa pendente!",
            duration: 1500,
            position: 'bottom',
            animated: true,
            color: 'light'
          });
          (await toast).present();
        }
      },
      {
        text: "Cancelar",
        icon: "close",
        role: 'cancel',
        handler: () => {
          console.log('Clicado no botão cancelar')
        }
      }]
    });
    await actionsheet.present();
  }
  async delete (task : any){
    this.tasks = this.tasks.filter(tasksArray=> task != tasksArray);
    this.updateLocalStorage();
    const toast = await this.toastCtrl.create({
      message: "Tarefa removida!",
      duration: 1500,
      position: 'bottom',
      animated: true,
      color: 'light'
    });
    toast.present();
  }
}
