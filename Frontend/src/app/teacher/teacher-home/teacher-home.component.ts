import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit {
  public name: string;
  displayedColumns: string[];
  dataSource: any;
  createdTasks: Task[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getCreatedTasks(); 
    this.name = 'Profesor X'
    this.displayedColumns = ['name', 'openDate', 'numExercises', 'description', 'delete'];
    this.dataSource = new MatTableDataSource<Task>(this.createdTasks);
    this.dataSource.paginator = this.paginator;
  }

  getCreatedTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.createdTasks = tasks;
        console.log(this.createdTasks);
      }
    );
  }
  
}