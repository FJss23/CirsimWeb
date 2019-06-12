import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


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
      .subscribe(data => {
        this.router.navigate(['/teacher/home']);
      },
      error => {
        console.log('ONLY TEACHER USERs');
      });
  }
}
