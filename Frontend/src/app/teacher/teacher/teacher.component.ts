import { Component, OnInit } from '@angular/core';
import { AuthServiceApi } from 'src/app/services/api/auth-api.service';
import { Task } from 'src/app/model/task';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(
    private authService: AuthServiceApi
  ) { }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }

}
