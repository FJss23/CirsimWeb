import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student/student.component';
import { StudentTaskTodoComponent } from './student-task-todo/student-task-todo.component';
import { SharedModule } from '../modules/shared.module';
import { StudentResolveExerciseComponent } from './student-resolve-exercise/student-resolve-exercise.component';

@NgModule({
  declarations: [    
    StudentComponent,
    StudentTaskTodoComponent,
    StudentResolveExerciseComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
