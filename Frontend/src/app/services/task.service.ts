import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Exercise } from '../model/exercise';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
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
   * TODO
   */
  addTask(task: Task): Observable<any> {
    return this.http.post<Task>(environment.task, task, this.httpOptions).pipe(
      tap(() => console.log(`Sending new task to backend`))
    );
  }

  /**
   * if teacher, returns the tasks created
   * if student, return the assigned tasks
   */
  getTasks(): Observable<any> {
    return this.http.get<Task[]>(environment.task, this.httpOptions).pipe(
      tap(() => console.log(`Getting tasks from backend`))
    );
  }

  /**
   * 
   * @param task 
   */
  deleteTask(task: Task): Observable<any> {
    return this.http.delete<Task>(environment.task + `/${task.id}`, this.httpOptions).pipe(
      tap(() => console.log(`Sending the delete petition`))
    )
  }
}
