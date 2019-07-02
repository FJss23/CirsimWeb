import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../model/modules/shared.module';
import { AdminAllUsersComponent } from './admin-all-users/admin-all-users.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminAllUsersComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],  
  entryComponents: [DialogComponent]
})
export class AdminModule { }
