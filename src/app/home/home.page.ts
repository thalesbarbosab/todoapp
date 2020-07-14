import { async } from '@angular/core/testing';
import { UtilsService } from './../services/utils.service';
import { TaskService } from './../services/task.service';
import { Component } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks: any[] = [];
  processing: boolean = false;
  constructor(private alertCtrl: AlertController,
    private actionsheetCtrl: ActionSheetController,
    private taskService: TaskService,
    private utilsService: UtilsService
  ) {
    this.utilsService.showLoading("Listando Tarefas...");
    this.processing = true;
    this.index();
  }

  async index() {
    this.taskService.index()
      .then(async (response: any[]) => {
        this.processing = false;
        console.table(response);
        //this.utilsService.hideLoading();
        this.tasks = response;
      })
      .catch(async (erro) => {
        console.error(erro);
        //this.utilsService.hideLoading();
        this.utilsService.toast("Ocorreu um erro ao listar as tarefas!", 2000, "danger");
      })
      .finally(() => {
        this.utilsService.hideLoading();
      })
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
            this.processing = true;
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
    if (task.trim().length == 0) {
      this.processing = false;
      this.utilsService.toast("Informe o que deseja fazer!", 2000, "warning");
      return;
    }
    else {
      let task2 = { name: task, done: false };
      this.tasks.push(task2);
      this.utilsService.showLoading("Incluindo tarefa..");
      this.taskService.store(task2.name)
        .then(async (response) => {
          this.processing = false;
          this.utilsService.toast("Tarefa adicionada!", 2000, "success");
          console.log(response);
          this.index();
        })
        .catch(async (erro) => {
          console.error(erro);
          this.processing = false;
          this.utilsService.toast("Ocorreu um erro ao adicionar a tarefa!", 2000, "danger");
        })
        .finally(() => {
          this.utilsService.hideLoading();
        })
    }
  }
  async actions(task: any) {
    const actionsheet = await this.actionsheetCtrl.create({
      header: "O que deseja fazer?",
      buttons: [{
        text: task.done ? "Pendente" : "Concluir",
        icon: task.done ? "radio-button-off" : "checkmark-circle",
        handler: async () => {
          this.processing = true;
          this.utilsService.showLoading("Atualizando tarefa..");
          this.taskService.changeStatus(task.id)
            .then(async (response) => {
              console.log(response);
              this.utilsService.toast(!task.done ? "Tarefa concluída!" : "Tarefa pendente!", 2000, "success");
              this.index();
            })
            .catch(async (erro) => {
              console.error(erro);
              this.utilsService.toast("Ocorreu um erro ao atualizar a tarefa!", 2000, "danger");
            })
            .finally(() => {
              this.processing = false;
              this.utilsService.hideLoading();
            })
        }
      },
      {
        text: "Cancelar",
        icon: "close",
        role: 'cancel',
        handler: () => {
          console.log('Clicado no botão cancelar');
        }
      }]
    });
    await actionsheet.present();
  }
  async delete(task: any) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      message: 'Tem certeza que deseja excluir?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.utilsService.showLoading("Removendo Tarefa...");
            this.taskService.delete(task.id)
              .then(async (response) => {
                console.log(response);
                this.processing = true;
                this.utilsService.toast("Tarefa removida!", 2000, "success");
                this.index();
              })
              .catch(async (erro) => {
                console.error(erro);
                this.utilsService.toast("Ocorreu um erro ao remover a tarefa!", 2000, "danger");
              })
              .finally(() => {
                this.processing = false;
                this.utilsService.hideLoading();
              })
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Clicado no botão cancelar');
          }
        }
      ]
    })
    await alert.present();
  }
}
