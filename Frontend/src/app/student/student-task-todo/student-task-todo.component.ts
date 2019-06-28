import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/task';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-task-todo',
  templateUrl: './student-task-todo.component.html',
  styleUrls: ['./student-task-todo.component.css']
})
export class StudentTaskTodoComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any;
  assignedTasks: Task[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
    this.getAssignedTasks(); 
    this.displayedColumns = ['title', 'openData', 'numExercises', 'action'];
    this.dataSource = new MatTableDataSource<Task>(this.assignedTasks);
    this.dataSource.paginator = this.paginator;
  }

  getAssignedTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.assignedTasks = tasks.body;
        this.dataSource.data = this.assignedTasks;
      }
    );
  }

  try(task: Task): void {
    console.log(`moving to resolve exercise page`);
    this.taskService.setTaskToResolveByStudent(task);
  }
}
