import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userToEditSubject: BehaviorSubject<User>;
  userToEdit: Observable<User>;

  constructor() { }

  public get userToEditValue() {
    if(this.userToEditSubject){
      return this.userToEditSubject.value;
    }
    return null;
  }

  setUserToEdit(user: User) {
    this.userToEditSubject = new BehaviorSubject<User>(user);
    this.userToEdit = this.userToEditSubject.asObservable();
  }
}
