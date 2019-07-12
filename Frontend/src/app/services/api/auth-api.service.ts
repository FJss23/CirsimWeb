import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../../model/user';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceApi {
  private httpOptions: { headers; observe; };
  private currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router){ 

    this.httpOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json',
       'Content-Type': 'application/json'
      }),
      observe: 'response'
    };
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
    
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  /**
   * post request to authenticate the user, if done correctly, 
   * get the token and decode it to save it in the browser session
   */
  login(username: string, password: string): Observable<any> {
    let body = { "username": username, "password": password }

    return this.http.post<any>(environment.login, body, this.httpOptions)
      .pipe(
        tap((res: HttpResponse<any>) => {
        let tokenBearer = res.headers.get(`Authorization`);
        let token = tokenBearer.replace('Bearer ', '');
        let decodeToken = jwt_decode(token);
        if(decodeToken.sub == username) {
          let user: User = new User(username, null, decodeToken.scope).setToken(token);
          sessionStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
