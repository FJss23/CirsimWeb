import { Injectable } from '@angular/core';
import { Task } from '../../model/task';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceApi {
  httpOptions: { headers; observe; };

  constructor(private http: HttpClient) { 
      this.httpOptions = {
        headers: new HttpHeaders({ 'Accept': 'application/json',
         'Content-Type': 'application/json'
        }),
        observe: 'response'
      };
  }
  
  /**
   * add a task and save it to the server
   */
  addTask(task: Task): Observable<any> {
    return this.http.post<Task>(environment.task, task, this.httpOptions);
  }

  /**
   * if teacher, returns the tasks created
   * if student, return the assigned tasks
   */
  getTasks(): Observable<any> {
    return this.http.get<Task[]>(environment.task, this.httpOptions);
  }

  /**
   * Deletes a task from the server
   */
  deleteTask(task: Task): Observable<any> {
    return this.http.delete<Task>(environment.task + `/${task.id}`, this.httpOptions);
  }

  editTask(task: Task): Observable<any> {
    return this.http.put<Task>(environment.task + `/${task.id}`, task, this.httpOptions);
  }
}
