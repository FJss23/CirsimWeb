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
   * 
   * @param task 
   */
  addUsers(users: User[]): Observable<any> {
    return this.http.post<User[]>(environment.user + `s`, users, this.httpOptions).pipe(
      tap(() => console.log(`Sending new users to backend`))
    );
  }

  /**
   * 
   */
  getUsers(): Observable<any> {
    return this.http.get<User[]>(environment.user, this.httpOptions).pipe(
      tap(() => console.log(`Getting users from backend`))
    );
  }

  /**
   * 
   */
  partialUpdateUser({status : value}, id: number): Observable<any> {
    return this.http.patch(environment.user + `/${id}`,  { status : value }, 
      this.httpOptions).pipe(
      tap(() => console.log(`Updating user from backend`))
    );
  }

  /**
   * 
   */
  deleteAllUsers(): Observable<any> {
    return this.http.delete(environment.user + `s`).pipe(
      tap(() => console.log(`All users deleted`))
    );
  }
}
