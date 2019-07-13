import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskServiceApi } from 'src/app/services/api/task-api.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Task } from 'src/app/model/task';
import { TeacherService } from 'src/app/services/teacher.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-sent-tasks',
  templateUrl: './teacher-sent-tasks.component.html',
  styleUrls: ['./teacher-sent-tasks.component.css']
})
export class TeacherSentTasksComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[];
  dataSource: any;
  createdTasks: Task[];

  successMessage: string;

  constructor(private taskService: TaskServiceApi,
    private teacherService: TeacherService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.getCreatedTasks(); 
    this.displayedColumns = ['title', 'openData', 'numExercises', 'action'];
    this.dataSource = new MatTableDataSource<Task>(this.createdTasks);
    this.dataSource.paginator = this.paginator;
    this.successMessage = this.userService.successMessageValue;
    this.teacherService.editingCurrentTask = false;
    if(this.successMessage != null){
      setTimeout(() => {
        this.successMessage = null;
        this.userService.setSuccessMessage(null);
      }, 750)
    }
  }

  getCreatedTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.createdTasks = tasks.body;
        this.sortByDate(this.createdTasks);
        this.dataSource.data = this.createdTasks;
      }
    );
  }

  initializeTask(): void {
    let task = new Task();
    this.teacherService.editingTask(false);
    this.teacherService.initTask(task);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe();
    this.createdTasks = this.createdTasks.filter(t => t !== task);
    this.dataSource.data = [...this.createdTasks];
  }

  sortByDate(tasks: Task[]): void {
    tasks.sort((a: Task, b: Task) => {
        return +new Date(b.openDate) - +new Date(a.openDate);
    });
  }
  
  viewTask(task: Task): void {
    this.teacherService.viewTask(task);
    this.router.navigateByUrl('teacher/task/view');
  }

  editTask(task: Task): void {
    this.teacherService.initTask(task);
    this.teacherService.editingTask(true);
  }
}