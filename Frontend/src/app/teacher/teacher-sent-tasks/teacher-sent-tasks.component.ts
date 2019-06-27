import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Task } from 'src/app/model/task';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-teacher-sent-tasks',
  templateUrl: './teacher-sent-tasks.component.html',
  styleUrls: ['./teacher-sent-tasks.component.css']
})
export class TeacherSentTasksComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any;
  createdTasks: Task[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private taskService: TaskService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getCreatedTasks(); 
    this.displayedColumns = ['name', 'openData', 'numExercises', 'description', 'action'];
    this.dataSource = new MatTableDataSource<Task>(this.createdTasks);
    this.dataSource.paginator = this.paginator;
  }

  initializeTask(): void {
    let task = new Task();
    this.taskService.initializeTask(task);
  }

  getCreatedTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.createdTasks = tasks.body;
        console.log(this.createdTasks);
        this.dataSource.data = this.createdTasks;
      }
    );
  }
  
}