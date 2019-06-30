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
    return this.http.post<User>(environment.user, users, this.httpOptions).pipe(
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

  partialUpdateUser({}): Observable<any> {
    return null;
  }
}
