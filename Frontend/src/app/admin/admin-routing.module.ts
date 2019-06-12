import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { DataLogComponent } from './data-log/data-log.component';

const routes: Routes = [
  {
    path: 'teacher',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'data-log', 
        component: DataLogComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
