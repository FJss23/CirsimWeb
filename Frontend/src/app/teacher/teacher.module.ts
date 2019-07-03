import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherSentTasksComponent } from './teacher-sent-tasks/teacher-sent-tasks.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SharedModule } from '../model/modules/shared.module';
import { TeacherNewTaskComponent } from './teacher-new-task/teacher-new-task.component';
import { TeacherExerciseComponent } from './teacher-exercise/teacher-exercise.component';

@NgModule({
  declarations: [
    TeacherSentTasksComponent,
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
