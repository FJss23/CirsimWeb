import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { Exercise } from 'src/app/model/exercise';
import { TeacherService } from 'src/app/services/teacher.service';

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
    private teacherService: TeacherService,
    private router: Router) 
  { }

  ngOnInit() {
   this.displayedColumns = ['title', 'description', 'action'];
   this.taskTitle = this.teacherService.getCurrentTask().title;
   this.dataSource = this.teacherService.getExercisesOfCurrentTask();
  }

  setTaskTitle(): void {
    this.teacherService.getCurrentTask().setTitle(this.taskTitle);
  }

  addTask(): void {
    this.setTaskTitle();
    this.taskService.addTask(this.teacherService.getCurrentTask()).subscribe(() => {
        console.log(`New task Added`);
        this.router.navigateByUrl('/teacher');
      }
    );
  }

  removeExercise(exercise: Exercise): void {
    this.teacherService.getCurrentTask().removeExercise(exercise);
    this.dataSource = [...this.teacherService.getExercisesOfCurrentTask()];
    console.log(`Removing exercise`);
  }
}