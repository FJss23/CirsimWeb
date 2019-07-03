import { Component, OnInit } from '@angular/core';
import { AuthServiceApi } from '../services/api/auth-api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  logged: boolean

  constructor(private authService: AuthServiceApi) { }

  ngOnInit() {
    this.logged = false;
  }

  isLogged(): boolean {
    return this.authService.currentUserValue ? true : false;
  }

}
