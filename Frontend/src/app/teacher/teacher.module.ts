import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherHomeComponent } from './teacher-home/teacher-home.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SharedModule } from '../modules/shared.module';
import { NewTaskComponent } from './task/new-task/new-task.component';
import { SimulationExerciseComponent } from './exercise/simulation-exercise/simulation-exercise.component';

@NgModule({
  declarations: [
    TeacherHomeComponent, 
    TeacherComponent,
    NewTaskComponent,
    SimulationExerciseComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    SharedModule
  ]
})
export class TeacherModule { }
