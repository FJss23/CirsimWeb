import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
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
    this.authService.getUser().subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authService.logout();
  }
}
