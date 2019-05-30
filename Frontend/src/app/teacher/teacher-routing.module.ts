import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherComponent } from './teacher/teacher.component';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children:[
          { 
            path: 'home', 
            component: TeacherHomeComponent 
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
