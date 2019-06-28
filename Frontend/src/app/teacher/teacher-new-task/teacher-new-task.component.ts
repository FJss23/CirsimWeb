import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { Exercise } from 'src/app/model/exercise';

@Component({
  selector: 'app-teacher-new-task',
  templateUrl: './teacher-new-task.component.html',
  styleUrls: ['./teacher-new-task.component.css']
})
export class TeacherNewTaskComponent implements OnInit {
  public taskTitle: string;
  displayedColumns: string[];
  dataSource: any;
  
  constructor(private taskService: TaskService,
    private router: Router) 
  { }

  ngOnInit() {
   this.displayedColumns = ['title', 'description', 'action'];
   this.taskTitle = this.taskService.getCurrentTaskByTeacher().title;
   this.dataSource = this.taskService.getExercisesOfCurrentTaskByTeacher();
  }

  setTaskTitle(): void {
    this.taskService.getCurrentTaskByTeacher().setTitle(this.taskTitle);
  }

  addTask(): void {
    this.setTaskTitle();
    this.taskService.addTask().subscribe(() => {
        console.log(`New task Added`);
        this.router.navigateByUrl('/teacher');
      }
    );
  }

  removeExercise(exercise: Exercise): void {
    this.taskService.getCurrentTaskByTeacher().removeExercise(exercise);
    this.dataSource = [...this.taskService.getExercisesOfCurrentTaskByTeacher()];
    console.log(`Removing exercise`);
  }
}