import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Exercise } from '../model/exercise';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  task: Task;
  httpOptions: { headers; observe; };

  constructor(private http: HttpClient,
    private router: Router) { 

      this.httpOptions = {
        headers: new HttpHeaders({ 'Accept': 'application/json',
         'Content-Type': 'application/json'
        }),
        observe: 'response'
      };
  }

  initializeTask(task: Task): void {
    console.log(`initialize task`);
    this.task = task;
  }

  addExercise(exercise: Exercise): void {
    console.log(exercise);
    console.log(this.task);
    this.task.addExercise(exercise);
  }

  getTask(): Task {
    return this.task;
  }

  addTask(): Observable<any> {
    console.log(this.task);
    return this.http.post<Task>(environment.newTask, this.task, this.httpOptions).pipe(
      tap(() => console.log(`Adding new task`))
    );
  }
}
