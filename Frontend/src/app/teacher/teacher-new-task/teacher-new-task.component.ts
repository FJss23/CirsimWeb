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
   this.taskTitle = this.taskService.getCurrentTask().title;
   this.dataSource = this.taskService.getExercisesOfCurrentTask();
  }

  setTaskTitle(): void {
    this.taskService.getCurrentTask().setTitle(this.taskTitle);
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
    this.taskService.getCurrentTask().removeExercise(exercise);
    this.dataSource = [...this.taskService.getExercisesOfCurrentTask()];
    console.log(`Removing exercise`);
  }
}