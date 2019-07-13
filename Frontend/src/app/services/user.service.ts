import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userToEditSubject: BehaviorSubject<User>;
  userToEdit: Observable<User>;

  private successMessageSubject: BehaviorSubject<string>;
  successMessage: Observable<string>;

  constructor() { }

  public get userToEditValue() {
    if(this.userToEditSubject){
      return this.userToEditSubject.value;
    }
    return null;
  }

  public get successMessageValue() {
    if(this.successMessageSubject){
      return this.successMessageSubject.value;
    }
    return null;
  }

  setUserToEdit(user: User) {
    this.userToEditSubject = new BehaviorSubject<User>(user);
    this.userToEdit = this.userToEditSubject.asObservable();
  }

  setSuccessMessage(message: string) {
    this.successMessageSubject = new BehaviorSubject<string>(message);
    this.successMessage = this.successMessageSubject.asObservable();
  }
}
