import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskServiceApi } from 'src/app/services/api/task-api.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Task } from 'src/app/model/task';
import { TeacherService } from 'src/app/services/teacher.service';

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

  constructor(private taskService: TaskServiceApi,
    private teacherService: TeacherService) { }

  ngOnInit() {
    this.getCreatedTasks(); 
    this.displayedColumns = ['title', 'openData', 'numExercises', 'action'];
    this.dataSource = new MatTableDataSource<Task>(this.createdTasks);
    this.dataSource.paginator = this.paginator;
  }

  initializeTask(): void {
    let task = new Task();
    this.teacherService.initTask(task);
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

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe();
    this.createdTasks = this.createdTasks.filter(t => t !== task);
    this.dataSource.data = [...this.createdTasks];
  }
  
}