import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TaskService {



  constructor(private _http: HttpClient) { }

  getTasks(){
    console.log("task Servie")
    return this._http.get<any>('http://localhost:3000/api/tasks')
    .pipe(map((taskData) => {
      return taskData.map((task) => {
        return {
          _id:task._id,
          taskName : task.taskName,
          taskStatus : task.taskStatus,
          taskDescription: task.taskDescription,
          archEmail : task.archEmail,
          buildEmail : task.buildEmail
        };
      });
    }))
  }

  getBuilderTasks(builderEmail){
    console.log("task Servie")
    return this._http.get<any>('http://localhost:3000/api/buildtasks/'+builderEmail)
    .pipe(map((taskData) => {
      return taskData.map((task) => {
        return {
          _id:task._id,
          taskName : task.taskName,
          taskStatus : task.taskStatus,
          taskDescription: task.taskDescription,
          archEmail : task.archEmail,
          buildEmail : task.buildEmail
        };
      });
    }))
  }

  getArchTasks(archEmail){
    console.log("task Servie")
    return this._http.get<any>('http://localhost:3000/api/archtasks/'+archEmail)
    .pipe(map((taskData) => {
      return taskData.map((task) => {
        return {
          _id:task._id,
          taskName : task.taskName,
          taskStatus : task.taskStatus,
          taskDescription: task.taskDescription,
          archEmail : task.archEmail,
          buildEmail : task.buildEmail
        };
      });
    }))
  }

  addTask(task : any){
    console.log("**********************")
    console.log("On ADD A TASK SERVIE");
    console.log("**********************")
    return this._http.post<any>('http://localhost:3000/api/task',task)
  }

  deleteTask(taskId :string){
    return this._http.delete('http://localhost:3000/api/task/'+taskId)
  }

  updateTask(task:Task){
    return this._http.put<any>('http://localhost:3000/api/task/'+task._id,task)
  }

}
