import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  username: string;
  password: string;

  constructor(
    public authService: AuthService,
    public router: Router) {

      this.setMessage();
     }

  ngOnInit() { }

  setMessage(): void {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(): void {
    this.message = 'Trying to log in...';
    this.authService.login().subscribe(() =>  {
      if(this.authService.isLoggedIn){
        let redirect = this.authService.redirectUrlAfterLogin ?
        this.router.parseUrl(this.authService.redirectUrlAfterLogin) : '/profesor';
        this.router.navigateByUrl(redirect);
      }
    });
  }
}
