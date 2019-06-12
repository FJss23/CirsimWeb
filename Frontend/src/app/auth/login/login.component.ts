import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../model/role';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() { 

  }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(() => {
        if(this.authService.isLoggedIn)  {
          if(this.authService.getAuthenticatedUser().role == Role.ADMIN){
            this.router.navigateByUrl('/admin');
          }
          if(this.authService.getAuthenticatedUser().role == Role.STUDENT){
            this.router.navigateByUrl('/student');
          }
          if(this.authService.getAuthenticatedUser().role == Role.TEACHER){
            this.router.navigateByUrl('/teacher');
          }
        }
      },
      error => {
        console.log('ONLY TEACHER USERs');
      });
  }
}
