import { Component, OnInit } from '@angular/core';
import { TaskServiceApi } from 'src/app/services/api/task-api.service';
import { Router } from '@angular/router';
import { Exercise } from 'src/app/model/exercise';
import { TeacherService } from 'src/app/services/teacher.service';
import { MyErrorStateMatcher } from 'src/app/model/errors/myErrorStateMatcher';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-new-task',
  templateUrl: './teacher-new-task.component.html',
  styleUrls: ['./teacher-new-task.component.css']
})
export class TeacherNewTaskComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any;
  numCreatedEx: number;
  taskForm: FormGroup;
  matcher: MyErrorStateMatcher;
  
  constructor(private taskService: TaskServiceApi,
    private teacherService: TeacherService,
    private router: Router,
    private formBuilder: FormBuilder) 
  { }

  ngOnInit() {
    this.taskForm  =  this.formBuilder.group({
      title: ['', Validators.required]
    });
   this.displayedColumns = ['title', 'description', 'action'];
   this.taskForm.value.title = this.teacherService.getCurrentTask().title;
   this.dataSource = this.teacherService.getExercisesOfCurrentTask();
   this.taskForm.get('title').setValue(this.teacherService.getCurrentTask().title);
   this.numCreatedEx = this.teacherService.orderExercises;
   console.log(this.numCreatedEx);
  }

  setTaskTitle(): void {
    this.teacherService.getCurrentTask().setTitle(this.taskForm.value.title);
  }

  /**
   * create the task
   */
  addTask(): void {
    this.setTaskTitle();
    this.taskService.addTask(this.teacherService.getCurrentTask()).subscribe(() => {
        this.router.navigateByUrl('/teacher');
      }
    );
  }

  /**
   * Deletes an exercise from the current task
   */
  removeExercise(exercise: Exercise): void {
    this.teacherService.getCurrentTask().removeExercise(exercise);
    this.dataSource = [...this.teacherService.getExercisesOfCurrentTask()];

  }
}