import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/model/notice';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit {
  public displayedNotice: string[]; 
  public displayedTask: string[]; 
  public dataSourceNotice: any; 
  public dataSourceTask: any;
  public name: string;

  constructor() { }

  ngOnInit() {
    this.displayedNotice = ['author', 'title', 'openDate'];
    this.displayedTask = ['code', 'name', 'numExercise', 'openDate',
    'closeDate', 'state', 'mark', 'complete'];
    this.dataSourceNotice = ELEMENT_DATA_TABLE1;
    this.dataSourceTask = ELEMENT_DATA_TABLE2;
    this.name = 'Profesor X'
  }

}
const ELEMENT_DATA_TABLE1: Notice[] = [
  new Notice('Profesor1', new Date(), 'Titulo1', 'Contenido1'),
  new Notice('Profesor2', new Date(), 'Titulo2', 'Contenido2'),
  new Notice('Profesor3', new Date(), 'Titulo3', 'Contenido3'),
  new Notice('Profesor4', new Date(), 'Titulo4', 'Contenido4'),
  new Notice('Profesor5', new Date(), 'Titulo5', 'Contenido5')
];

const ELEMENT_DATA_TABLE2: Task[] = [
  new Task('Profesor1','1ºA','TE1','Tarea electrónica',new Date(),
    new Date(),'Abierta'),
  new Task('Profesor2','2ºA','TE1','Tarea electrónica',new Date(),
    new Date(),'Abierta'),
  new Task('Profesor3','3ºA','TE1','Tarea electrónica',new Date(),
    new Date(),'Abierta'),
  new Task('Profesor4','4ºA','TE1','Tarea electrónica',new Date(),
    new Date(),'Abierta'),
  new Task('Profesor5','5ºA','TE1','Tarea electrónica',new Date(),
    new Date(),'Abierta')
];