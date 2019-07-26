import { Component, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/services/api/user-api.service';
import { Role } from 'src/app/model/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/model/errors/myErrorStateMatcher';
import { User } from 'src/app/model/user';
import { Status } from 'src/app/model/status';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-new-user',
  templateUrl: './admin-new-user.component.html',
  styleUrls: ['./admin-new-user.component.css']
})
export class AdminNewUserComponent implements OnInit {
  roles: Role[];
  status: Status[];
  userForm: FormGroup;
  matcher: MyErrorStateMatcher;
  repeatedUserError: boolean;
  blankSpace: boolean;

  userToEdit: User;

  title: string;
  btnText: string;
  titlePage: string;

  constructor(private userApiService: UserApiService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.roles = [Role.STUDENT, Role.TEACHER];
    this.status = [Status.ACTIVE, Status.INACTIVE];
    this.userForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.matcher = new MyErrorStateMatcher();
    this.repeatedUserError = false;
    this.blankSpace = false;
    this.title = "Añade la información del nuevo usuario";
    this.btnText = "Crear usuario";
    this.titlePage = "Nuevo usuario";

    this.userToEdit = this.userService.userToEditValue;
    if(this.userToEdit != null){
      this.title = "Añade la información del usuario que quieres editar";
      this.btnText = "Editar usuario";
      this.title = "Editar usuario";
      this.editMode();
    }
  }

  
  addUser(user: User): void {

    this.userApiService.getUsers().subscribe((allUsers: any) => {
      let users: User[] = allUsers.body;
      
      if(this.checkIfUsernameExists(users, user.username)){
        this.userApiService.addUser(user).subscribe(
          () => {
            this.repeatedUserError = false;
            this.userService.setSuccessMessage('Usuario añadido correctamente');
            this.router.navigateByUrl('/admin'); 
          });
      } else {
        this.repeatedUserError = true;
      }
      
    });
  }

  editUser(user: User): void {

    this.userApiService.getUsers().subscribe((allUsers: any) => {
      let users: User[] = allUsers.body;

      if(this.checkIfEditingTryExistingUsername(users, user.username)){
        this.userApiService.updateUser(user.setId(this.userToEdit.id)).subscribe(
          () => {
            this.repeatedUserError = false;
            this.userService.setUserToEdit(null);
            this.userService.setSuccessMessage('Usuario editado correctamente');
            this.router.navigateByUrl('/admin');
        });
      } else {
        this.repeatedUserError = true;
      }
    });
  }

  generateUser(): User {
    let username = this.userForm.get('username').value.trim();
    let password = this.userForm.get('password').value.trim();
    let name = this.userForm.get('name').value.trim();
    let surname = this.userForm.get('surname').value.trim();
    let role = this.userForm.get('role').value;
    let status = this.userForm.get('status').value;

    return new User(username, password, role)
      .setName(name).setSurName(surname).setStatus(status);
  }

  checkIfEditingTryExistingUsername(users: User[], newusername): boolean {
    let canCreate = true;
    let existingUsername = this.userToEdit.username;
    users.forEach((user: User) => {
      if(user.username == newusername && user.username != existingUsername ){
        canCreate = false;
      }  
    });
    return canCreate;
  }

  checkIfUsernameExists(users: User[], username): boolean {
    let canCreate = true;
    users.forEach((user: User) => {
      if(user.username == username){
        canCreate = false;
      }  
    });
    return canCreate;
  }

  editMode() {
    this.userForm.get('username').setValue(this.userToEdit.username);
    this.userForm.get('name').setValue(this.userToEdit.name);
    this.userForm.get('surname').setValue(this.userToEdit.surname);
    this.userForm.get('status').setValue(`STATUS_${this.userToEdit.status}`);
    this.userForm.get('role').setValue(`ROLE_${this.userToEdit.role}`);
    this.userForm.get('role').disable();
  }

  applyUser(): void {
    if(this.userForm.invalid){
      return;
    } 

    let user: User = this.generateUser();
    
    if(user.username == "" || user.password == "" || user.name == "" 
      || user.surname == ""){

      this.blankSpace = true;
      return;
      
    } else {
      this.blankSpace = false;
    }

    this.redirect(user);
  }

  redirect(user: User): void {
    
    if(this.userToEdit != null){
      this.editUser(user);
    } else {
      this.addUser(user);
    }
  }
}
