import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../model/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  httpOptions: { headers; observe; };

  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({ 'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    };
  }

  /**
   * add a list of users
   */
  addUsers(users: User[]): Observable<any> {
    return this.http.post<User[]>(environment.user + `s`, users, this.httpOptions);
  }

  /**
   * get all the users of the application
   */
  getUsers(): Observable<any> {
    return this.http.get<User[]>(environment.user, this.httpOptions);
  }

  /**
   * change a user's status
   */
  partialUpdateUser({status : value}, id: number): Observable<any> {
    return this.http.patch(environment.user + `/${id}`,  { status : value }, 
      this.httpOptions);
  }

  /**
   * Remove all users of the application
   */
  deleteAllUsers(): Observable<any> {
    return this.http.delete(environment.user + `s`, this.httpOptions);
  }

  /**
   * Delete one user
   */
  deleteUser(user: User): Observable<any>  {
    return this.http.delete(environment.user + `/${user.id}`, this.httpOptions);
  }

  /**
   * 
   * add a user to the system
   */
  addUser(user: User): Observable<any> {
    return this.http.post(environment.user, user,this.httpOptions);
  }

  /**
   * update a user
   */
  updateUser(user: User): Observable<any> {
    return this.http.put(environment.user + `/${user.id}`, user, this.httpOptions);
  }
}
