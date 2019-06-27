import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentGuard } from '../guards/student.guard';
import { StudentTaskTodoComponent } from './student-task-todo/student-task-todo.component';

const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [StudentGuard],
    children: [
      {
        path: '', 
        component: StudentTaskTodoComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
