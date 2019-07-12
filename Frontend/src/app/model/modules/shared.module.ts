import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ColorPickerModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule, 
    ColorPickerModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
