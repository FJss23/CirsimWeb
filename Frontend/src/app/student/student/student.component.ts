import { Component, OnInit } from '@angular/core';
import { AuthServiceApi } from 'src/app/services/api/auth-api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(
    private authService: AuthServiceApi
  ) { }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }
}
