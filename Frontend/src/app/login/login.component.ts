import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required, Validators.minLength(5), Validators.maxLength(15)],
      password: [null, Validators.required, Validators.minLength(5), Validators.maxLength(15)]
    });
  }

  private onSubmit(): void {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value);
    }
  }

  public validLoginField(field: string): boolean {
    return true;
  } 
}
