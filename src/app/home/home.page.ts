import { TaskService } from './../services/task.service';
import { Component } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: any[] = [];
  constructor(private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionsheetCtrl: ActionSheetController,
    private taskService: TaskService
  ) {
    this.index();
  }

  async index(){
    this.taskService.index()
      .then(async(response : any[])=>{
        console.table(response);
        this.tasks = response;
      })
      .catch(async (erro) => {
        console.error(erro);
        const toast = await this.toastCtrl.create({
          message: "Ocorreu um erro ao listar as tarefas!",
          duration: 1500,
          position: 'bottom',
          animated: true,
          color: 'danger'
        });
        toast.present();
      });
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
    else {
      let task2 = { name: task, done: false };
      this.tasks.push(task2);

      this.taskService.store(task2.name)
        .then(async (response) => {
          const toast = await this.toastCtrl.create({
            message: "Tarefa adicionada!",
            duration: 1500,
            position: 'bottom',
            animated: true,
            color: 'light'
          });
          toast.present();
          console.log(response);
          this.index();
        })
        .catch(async (erro) => {
          console.error(erro);
          const toast = await this.toastCtrl.create({
            message: "Ocorreu um erro ao adicionar a tarefa!",
            duration: 1500,
            position: 'bottom',
            animated: true,
            color: 'danger'
          });
          toast.present();
        });
    }
  }
  async actions(task: any) {
    const actionsheet = await this.actionsheetCtrl.create({
      header: "O que deseja fazer?",
      buttons: [{
        text: task.done ? "Desmarcar" : "Marcar",
        icon: task.done ? "radio-button-off" : "checkmark-circle",
        handler: async () => {
          this.taskService.changeStatus(task.id)
            .then(async (response)=>{
              console.log(response);
              const toast = await this.toastCtrl.create({
                message: !task.done ? "Tarefa concluída!" : "Tarefa pendente!",
                duration: 1500,
                position: 'bottom',
                animated: true,
                color: 'light'
              });
              toast.present();
              this.index();
            })
            .catch(async(erro)=>{
              console.error(erro);
              const toast = await this.toastCtrl.create({
                message: "Ocorreu um erro ao atualizar a tarefa!",
                duration: 1500,
                position: 'bottom',
                animated: true,
                color: 'danger'
              });
              toast.present();
            })
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
  async delete(task: any) {
    this.taskService.delete(task.id)
      .then(async(response)=>{
        console.log(response)
        const toast = await this.toastCtrl.create({
          message: "Tarefa removida!",
          duration: 1500,
          position: 'bottom',
          animated: true,
          color: 'light'
        });
        toast.present();
        this.index();
      })
      .catch(async(erro)=>{
        console.error(erro);
        const toast = await this.toastCtrl.create({
          message: "Ocorreu um erro ao remover a tarefa!",
          duration: 1500,
          position: 'bottom',
          animated: true,
          color: 'danger'
        });
        toast.present();
      })
  }
}
