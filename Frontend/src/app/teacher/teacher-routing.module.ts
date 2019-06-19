import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherGuard } from '../guards/teacher.guard';
import { TeacherNewTaskComponent } from './teacher-new-task/teacher-new-task.component';
import { TeacherExerciseComponent } from './teacher-exercise/teacher-exercise.component';

const routes: Routes = [
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [TeacherGuard],
    children: [
      {
        path: '', 
        component: TeacherHomeComponent 
      },
      {
        path: 'task/new',
        component: TeacherNewTaskComponent 
      },
      {
        path: 'task/new/simulation',
        component: TeacherExerciseComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
