import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SharedModule } from '../modules/shared.module';
import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
  declarations: [
    TeacherHomeComponent, 
    TeacherComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModule
  ]
})
export class TeacherModule { }
