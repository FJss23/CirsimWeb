import { Component, OnInit } from '@angular/core';
import { AuthServiceApi } from 'src/app/services/api/auth-api.service';

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
