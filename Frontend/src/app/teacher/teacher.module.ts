import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SharedModule } from '../modules/shared.module';
import { TeacherNewTaskComponent } from './teacher-new-task/teacher-new-task.component';
import { TeacherExerciseComponent } from './teacher-exercise/teacher-exercise.component';

@NgModule({
  declarations: [
    TeacherHomeComponent,
    TeacherComponent,
    TeacherNewTaskComponent,
    TeacherExerciseComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModule,
  ]
})
export class TeacherModule { }
