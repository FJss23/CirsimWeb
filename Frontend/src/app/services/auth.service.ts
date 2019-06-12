import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean;
  public redirectUrl: string;
  private authenticatedUser: User;
  private httpOptions: { headers; observe; };

  constructor(
    private http: HttpClient,
    private router: Router){ 

    this.httpOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json',
       'Content-Type': 'application/json'
      }),
      observe: 'response'
    };

    this.isLoggedIn = false;
  }

  login(username: string, password: string): Observable<any> {
    let body = { "username": username, "password": password }
    console.log(`Loggin to ${environment.login}`);

    return this.http.post<any>(environment.login, body, this.httpOptions)
      .pipe(tap((res: HttpResponse<any>) => {
        let tokenBearer = res.headers.get(`Authorization`);
        let token = tokenBearer.replace('Bearer ', '');
        console.log(`Response ${token}`);
        let decodeToken = jwt_decode(token);
        console.log(`Decode token ${decodeToken.sub} and ${decodeToken.scope}`);
        if(decodeToken.sub == username) {
          sessionStorage.setItem('token', token);
          this.authenticatedUser = new User(username, password, decodeToken.scope, token);
          this.isLoggedIn = true;
        }
      }));
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.isLoggedIn = false;
    this.authenticatedUser = null;
    this.router.navigate(['/login']);
  }

  getAuthenticatedUser(): User {
    return this.authenticatedUser;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }

}
