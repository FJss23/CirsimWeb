import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../model/modules/shared.module';
import { AdminAllUsersComponent } from './admin-all-users/admin-all-users.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminAllUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
