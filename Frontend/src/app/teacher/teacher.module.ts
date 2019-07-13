import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherSentTasksComponent } from './teacher-sent-tasks/teacher-sent-tasks.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SharedModule } from '../model/modules/shared.module';
import { TeacherNewTaskComponent } from './teacher-new-task/teacher-new-task.component';
import { TeacherExerciseComponent } from './teacher-exercise/teacher-exercise.component';
import { TeacherViewExercisesComponent } from './teacher-view-exercises/teacher-view-exercises.component';
import { TeacherEditorExplanationComponent } from './teacher-editor-explanation/teacher-editor-explanation.component';

@NgModule({
  declarations: [
    TeacherSentTasksComponent,
    TeacherComponent,
    TeacherNewTaskComponent,
    TeacherExerciseComponent,
    TeacherViewExercisesComponent,
    TeacherEditorExplanationComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModule,
  ]
})
export class TeacherModule { }
