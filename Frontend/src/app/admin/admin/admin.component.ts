import { Component, OnInit } from '@angular/core';
import { AuthServiceApi } from 'src/app/services/api/auth-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private authService: AuthServiceApi
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
