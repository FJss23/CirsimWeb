import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from '../guards/admin.guard';
import { AdminAllUsersComponent } from './admin-all-users/admin-all-users.component';
import { AdminNewUserComponent } from './admin-new-user/admin-new-user.component';
import { AdminLoadUsersComponent } from './admin-load-users/admin-load-users.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '', 
        component: AdminAllUsersComponent 
      },
      {
        path: 'user/new',
        component: AdminNewUserComponent
      },
      {
        path: 'load-users',
        component: AdminLoadUsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
