import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherSentTasksComponent } from './teacher-sent-tasks/teacher-sent-tasks.component';
import { TeacherGuard } from '../guards/teacher.guard';
import { TeacherNewTaskComponent } from './teacher-new-task/teacher-new-task.component';
import { TeacherExerciseComponent } from './teacher-exercise/teacher-exercise.component';
import { TeacherViewExercisesComponent } from './teacher-view-exercises/teacher-view-exercises.component';

const routes: Routes = [
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [TeacherGuard],
    children: [
      {
        path: '', 
        component: TeacherSentTasksComponent 
      },
      {
        path: 'task/new',
        component: TeacherNewTaskComponent 
      },
      {
        path: 'task/new/simulation',
        component: TeacherExerciseComponent
      },
      {
        path: 'task/view',
        component: TeacherViewExercisesComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
