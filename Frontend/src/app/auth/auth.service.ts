import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from '../services/configuration.service'
import { ApiService } from '../services/api.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrlAfterLogin: string;

  constructor(
    private apiService: ApiService,
    private configurationService: ConfigurationService,
  ){ }

  login(username: string, password: string): Observable<boolean> {
    const header = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = `username=${username}&password=${password}`;
    return this.apiService.post(this.configurationService.getUrlLogin(),
    header, body)
  }

  logour(): void  {
    this.isLoggedIn = false;
  }
}
