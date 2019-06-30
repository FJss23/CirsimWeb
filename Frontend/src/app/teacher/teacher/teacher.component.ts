import { Component, OnInit } from '@angular/core';
import { AuthServiceApi } from 'src/app/services/api/auth-api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  public currentUser: User;

  constructor(
    private authService: AuthServiceApi
  ) { }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }
}
