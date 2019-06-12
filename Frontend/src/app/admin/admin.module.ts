import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DataLogComponent } from './data-log/data-log.component';
import { SharedModule } from '../modules/shared.module';

@NgModule({
  declarations: [
    DataLogComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
