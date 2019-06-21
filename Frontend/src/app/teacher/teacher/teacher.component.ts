import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  public currentUser: User;

  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) { }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }

  initializeTask(): void {
    let task = new Task();
    this.taskService.initializeTask(task);
  }
}
