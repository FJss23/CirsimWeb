import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/task';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TaskServiceApi } from 'src/app/services/api/task-api.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-task-todo',
  templateUrl: './student-task-todo.component.html',
  styleUrls: ['./student-task-todo.component.css']
})
export class StudentTaskTodoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[];
  dataSource: any;
  assignedTasks: Task[];

  constructor(private taskService: TaskServiceApi,
    private studentService: StudentService) { }

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
        this.sortByDate(this.assignedTasks);
        this.dataSource.data = this.assignedTasks;
      }
    );
  }

  /**
   * Assign a selected task to solve
   */
  try(task: Task): void {
    this.studentService.setTaskToResolve(task);
  }

  sortByDate(tasks: Task[]): void {
    tasks.sort((a: Task, b: Task) => {
      return +new Date(b.openDate) - +new Date(a.openDate);
    });
  }
}
