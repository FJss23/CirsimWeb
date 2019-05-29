import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherComponent } from './teacher/teacher.component';

@NgModule({
  declarations: [TeacherHomeComponent, TeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
