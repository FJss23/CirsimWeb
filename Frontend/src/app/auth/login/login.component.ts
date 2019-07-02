import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthServiceApi } from '../../services/api/auth-api.service';
import { Role } from '../../model/role';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    public authService: AuthServiceApi,
    public router: Router) { }

  ngOnInit() { 

  }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(() => {
        let user: User = this.authService.getAuthenticatedUser();
        console.log(`login ${user}`);
        
        if(user)  {
          if(user.role == Role.ADMIN){
            this.router.navigateByUrl('/admin');
          }
          if(user.role == Role.STUDENT){
            this.router.navigateByUrl('/student');
          }
          if(user.role == Role.TEACHER){
            this.router.navigateByUrl('/teacher');
          }
        }
      },
      error => {
        console.log('ONLY TEACHER USERs');
      });
  }
}
