import { Component, OnInit } from '@angular/core';
import { TaskServiceApi } from 'src/app/services/api/task-api.service';
import { Router } from '@angular/router';
import { Exercise } from 'src/app/model/exercise';
import { TeacherService } from 'src/app/services/teacher.service';
import { MyErrorStateMatcher } from 'src/app/model/errors/myErrorStateMatcher';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-new-task',
  templateUrl: './teacher-new-task.component.html',
  styleUrls: ['./teacher-new-task.component.css']
})
export class TeacherNewTaskComponent implements OnInit {
  displayedColumns: string[];
  dataSource: any;
  taskForm: FormGroup;
  date: string;
  matcher: MyErrorStateMatcher;
  errorMinEx: boolean;
  errorMaxEx: boolean;

  title: string;
  btnMessage: string;
  
  constructor(private taskService: TaskServiceApi,
    private teacherService: TeacherService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) 
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

   let format = 'yyyy-MM-ddTHH:mm';
   let myDate = this.teacherService.getCurrentTask().openDate;
   let locale = 'es-ES';
   this.date = formatDate(myDate, format, locale);

   this.title = 'Nueva tarea';
   this.btnMessage = 'Crear tarea'
   if(this.teacherService.editingCurrentTask == true){
    this.title = 'Editar tarea';
    this.btnMessage = 'Editar tarea'
   }
  }

  adjustTaskParams(): void {
    this.errorMaxEx = this.teacherService.getExercisesOfCurrentTask().length == 10;
    if(!this.errorMaxEx){
      this.setTitle();
      this.setTime();
      this.teacherService.setExerciseToEdit(null);
      this.router.navigateByUrl('teacher/task/new/simulation');
    }
  }

  /**
   * create the task
   */
  actionTask(): void {
    this.errorMinEx = this.teacherService.getExercisesOfCurrentTask().length == 0;
    if(!this.taskForm.invalid && !this.errorMinEx && !this.validDate()){
      this.setTitle();
      if(!this.openNow()){
        this.setTime();
      }

      if(this.teacherService.editingCurrentTask){
        this.editTask();
      } else {
        this.addingTask();
      }   
    }
  }

  editTask(): void {
    this.taskService.editTask(this.teacherService.getCurrentTask()).subscribe(() => {
      this.teacherService.editingCurrentTask = false;
      this.userService.setSuccessMessage('Tarea editada correctamente');
      this.router.navigateByUrl('/teacher');
    });
  }

  addingTask(): void {
    this.taskService.addTask(this.teacherService.getCurrentTask()).subscribe(() => {
      this.userService.setSuccessMessage('Tarea creada correctamente');
      this.router.navigateByUrl('/teacher');
    });
  }

  setTime(): void {
    this.teacherService.changeOpenDate(new Date(this.date));
  }

  setTitle(): void {
    this.teacherService.getCurrentTask().title = this.taskForm.value.title;
  }

  /**
   * Deletes an exercise from the current task
   */
  removeExercise(exercise: Exercise): void {
    this.teacherService.getCurrentTask().exercises.forEach((item, index) => {
      if(item === exercise) { 
        this.teacherService.getCurrentTask().exercises.splice(index,1);
      }
    });
    this.dataSource = [...this.teacherService.getExercisesOfCurrentTask()];
  }

  editExercise(exercise: Exercise): void {
    this.teacherService.setExerciseToEdit(exercise);
    this.router.navigateByUrl('teacher/task/new/simulation');
  }

  openNow(): boolean{
    return new Date() > new Date(this.date);
  }

  validDate(): boolean {
    return this.date == ''
  }
}