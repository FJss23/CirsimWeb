import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student/student.component';
import { StudentTaskTodoComponent } from './student-task-todo/student-task-todo.component';
import { SharedModule } from '../modules/shared.module';

@NgModule({
  declarations: [    
    StudentComponent,
    StudentTaskTodoComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
