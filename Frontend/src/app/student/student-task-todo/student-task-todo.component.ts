import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/task';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TaskService } from 'src/app/services/task.service';

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

  constructor(private taskService: TaskService) { }

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
    
  }
}
