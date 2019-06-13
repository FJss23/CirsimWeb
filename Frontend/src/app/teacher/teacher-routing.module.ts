import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherGuard } from '../guards/teacher.guard';
import { NewTaskComponent } from './new-task/new-task.component';
import { SimulationExerciseComponent } from './simulation-exercise/simulation-exercise.component';

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
        component: NewTaskComponent
      },
      {
        path: 'task/new/simulation',
        component: SimulationExerciseComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
