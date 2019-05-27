import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators'; //delete...

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrlAfterLogin: string;

  login(): Observable<boolean> {
    // simulates the call to API
    return of(true).pipe(
      delay(1000),
      tap((val) => this.isLoggedIn = true)
    );
  }

  logour(): void  {
    this.isLoggedIn = false;
  }
}
