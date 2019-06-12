import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  public currentUser: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }
}
