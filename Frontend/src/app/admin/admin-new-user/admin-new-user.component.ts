import { Component, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/services/api/user-api.service';
import { Role } from 'src/app/model/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/model/errors/myErrorStateMatcher';
import { User } from 'src/app/model/user';
import { Status } from 'src/app/model/status';

@Component({
  selector: 'app-admin-new-user',
  templateUrl: './admin-new-user.component.html',
  styleUrls: ['./admin-new-user.component.css']
})
export class AdminNewUserComponent implements OnInit {
  roles: Role[];
  userForm: FormGroup;
  matcher: MyErrorStateMatcher;
  repeatedUserError: boolean;

  constructor(private userService: UserApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.roles = [Role.STUDENT, Role.TEACHER];
    this.userForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.matcher = new MyErrorStateMatcher();
    this.repeatedUserError = false;
  }

  addUser(): void {
    if(this.userForm.invalid){
      return
    }

    let username = this.userForm.get('username').value;
    let password = this.userForm.get('password').value;
    let name = this.userForm.get('name').value;
    let surname = this.userForm.get('surname').value;
    let role = this.userForm.get('role').value;

    let user = new User(username, password, role)
      .setName(name).setSurName(surname).setStatus(Status.ACTIVE);

    this.userService.getUsers().subscribe((allUsers: any) => {
      console.log(allUsers);
      let users: User[] = allUsers.body;
      let canCreate = true;

      users.forEach((existUser: User) => {
        if(existUser.username != username){
          canCreate = false;
        }  
      });

      if(canCreate){
        this.userService.addUser(user).subscribe(
          () => this.repeatedUserError = false
        );
      } else {
        this.repeatedUserError = true;
      }

    });
  }

}
