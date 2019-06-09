import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  form: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router,
    public formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])]
    });
  }

  login(): void {
    this.authService.login(this.form.value);
  }
}
