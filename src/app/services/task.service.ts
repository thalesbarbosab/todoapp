import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient : HttpClient) { }

  index(){
    let url = "http://todobackend.homestead/api/tasks";
    var header = {
      headers: new  HttpHeaders()
        .set('Content-Type', `application/json`)
    }
    return this.httpClient.get(url, header).toPromise();
  }

  store(task:string){
    let url = "http://todobackend.homestead/api/tasks";
    var header = {
      headers: new  HttpHeaders()
        .set('Content-Type', `application/json`)
    }
    let param = {description : task};
    return this.httpClient.post(url, param,  header).toPromise();
  }
  changeStatus(task:any){
    let url = "http://todobackend.homestead/api/tasks/" + task + "/status";
    var header = {
      headers: new  HttpHeaders()
        .set('Content-Type', `application/json`)
    }
    return this.httpClient.put(url,header).toPromise();
  }
  delete(task : any){
    let url = "http://todobackend.homestead/api/tasks/" + task;
    var header = {
      headers: new  HttpHeaders()
        .set('Content-Type', `application/json`)
    }
    return this.httpClient.delete(url,header).toPromise();
  }
}
