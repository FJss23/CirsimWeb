import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentGuard } from '../guards/student.guard';
import { StudentHomeComponent } from './student-home/student-home.component';

const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [StudentGuard],
    children: [
      {
        path: 'home', 
        component: StudentHomeComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
