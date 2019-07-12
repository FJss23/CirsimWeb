import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../model/modules/shared.module';
import { AdminAllUsersComponent } from './admin-all-users/admin-all-users.component';
import { DialogComponent } from './dialog/dialog.component';
import { AdminLoadUsersComponent } from './admin-load-users/admin-load-users.component';
import { AdminNewUserComponent } from './admin-new-user/admin-new-user.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminAllUsersComponent,
    DialogComponent,
    AdminLoadUsersComponent,
    AdminNewUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],  
  entryComponents: [DialogComponent]
})
export class AdminModule { }
