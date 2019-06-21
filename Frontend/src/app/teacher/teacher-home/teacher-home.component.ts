import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit {
  public name: string;

  constructor() { }

  ngOnInit() {
    this.name = 'Profesor X'
  }
  
}