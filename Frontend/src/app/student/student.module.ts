import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student/student.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { SharedModule } from '../modules/shared.module';

@NgModule({
  declarations: [    
    StudentComponent,
    StudentHomeComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
