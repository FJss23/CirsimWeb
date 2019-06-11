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
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  private httpOptions: { headers; observe; }  = {
    headers: new HttpHeaders({ 'Accept': 'application/json',
    'Content-Type': 'application/json'
   }),
    observe: 'response'
  };

  constructor(
    private http: HttpClient,
    private router: Router){ 

      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    let body = { "username": username, "password": password }
    console.log(`Loggin to ${environment.login}`);

    return this.http.post<any>(environment.login, body, this.httpOptions)
      .pipe(tap((res: HttpResponse<any>) => {
        let tokenBearer = res.headers.get(`Authorization`);
        let token = tokenBearer.replace('Bearer ', 'S');
        console.log(`Response ${token}`);
        let decodeToken = jwt_decode(token);
        console.log(`Decode token ${decodeToken.sub}`);
       /* if(loginUser && loginUser.token){
          localStorage.setItem('user', JSON.stringify(loginUser));
          this.currentUserSubject.next(loginUser);
        }*/
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.getValue();
  }

  getUser(): Observable<User> {
    return this.currentUser;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }

}
