import { Component, OnInit } from '@angular/core';
import { TaskServiceApi } from 'src/app/services/api/task-api.service';
import { Router } from '@angular/router';
import { Exercise } from 'src/app/model/exercise';
import { TeacherService } from 'src/app/services/teacher.service';
import { MyErrorStateMatcher } from 'src/app/model/errors/myErrorStateMatcher';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-teacher-new-task',
  templateUrl: './teacher-new-task.component.html',
  styleUrls: ['./teacher-new-task.component.css']
})
export class TeacherNewTaskComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any;
  taskForm: FormGroup;
  matcher: MyErrorStateMatcher;
  errorMinEx: boolean;
  errorMaxEx: boolean;
  
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
   this.dataSource = this.teacherService.getExercisesOfCurrentTask();
   this.taskForm.get('title').setValue(this.teacherService.getCurrentTask().title);
   this.errorMinEx = false;
   this.errorMaxEx = false;
   this.matcher = new MyErrorStateMatcher();
  }

  setTaskTitle(): void {
    this.errorMaxEx = this.teacherService.getExercisesOfCurrentTask().length == 10;
    if(!this.errorMaxEx){
      this.teacherService.getCurrentTask().setTitle(this.taskForm.value.title);
      this.router.navigateByUrl('teacher/task/new/simulation');
    }
  }

  /**
   * create the task
   */
  addTask(): void {
    this.errorMinEx = this.teacherService.getExercisesOfCurrentTask().length == 0;
    if(!this.taskForm.invalid && !this.errorMinEx){
      this.taskService.addTask(this.teacherService.getCurrentTask()).subscribe(() => {
        this.router.navigateByUrl('/teacher');
      });
    }
  }

  /**
   * Deletes an exercise from the current task
   */
  removeExercise(exercise: Exercise): void {
    this.teacherService.getCurrentTask().removeExercise(exercise);
    this.dataSource = [...this.teacherService.getExercisesOfCurrentTask()];
  }
}