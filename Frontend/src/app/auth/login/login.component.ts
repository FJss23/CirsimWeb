import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthServiceApi } from '../../services/api/auth-api.service';
import { Role } from '../../model/role';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/model/errors/myErrorStateMatcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  matcher: MyErrorStateMatcher;
  error: string;

  constructor(
    public authService: AuthServiceApi,
    public router: Router,
    private formBuilder: FormBuilder) {

    }

  ngOnInit() { 
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.matcher = new MyErrorStateMatcher();
    this.error = sessionStorage.getItem('credentials');
    sessionStorage.removeItem('credentials');
  }

  get formControls() { 
    return this.loginForm.controls; 
  }

  login(): void {
    if(this.loginForm.invalid){
      return;
    }

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(() => {
        const user = this.authService.currentUserValue;
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
        this.error = error;
      });
  }
}
