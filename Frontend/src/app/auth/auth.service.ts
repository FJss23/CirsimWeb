import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from '../services/configuration.service'
import { CommunicationService } from '../services/communication.service'; 
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrlAfterLogin: string;

  constructor(
    private communicationService: CommunicationService,
    private configurationService: ConfigurationService,
  ){ }

  login(user: User): Observable<boolean> {
    const loginHeader = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = `username=${username}&password=${password}`;
    return this.communicationService.post(this.configurationService.getUrlLogin(),
    loginHeader, body)
  }

  logour(): void  {
    this.isLoggedIn = false;
  }
}
