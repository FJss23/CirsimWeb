import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CommunicationService } from '../global-services/communication.service'; 
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private communicationService: CommunicationService,
  ){ }

  login(user: User): Observable<boolean> {
    const loginHeader = new HttpHeaders({
      'Accept': 'application/json'
    });
    return null;
  }
}
