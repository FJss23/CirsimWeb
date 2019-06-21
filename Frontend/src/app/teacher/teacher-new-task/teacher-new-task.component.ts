import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/task';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-teacher-new-task',
  templateUrl: './teacher-new-task.component.html',
  styleUrls: ['./teacher-new-task.component.css']
})
export class TeacherNewTaskComponent implements OnInit {

  constructor(private taskService: TaskService,
    private authService: AuthService) { }

  ngOnInit() {
    this.initializeTask();
  }

  initializeTask(): void {
    let task = new Task(this.authService.getAuthenticatedUser());
    this.taskService.initializeTask(task);
  }

  addTask(): void {
    this.taskService.getTask().setName('Autor1');
  }
}
