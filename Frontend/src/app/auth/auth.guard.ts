import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,
          CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
    console.log('AuthGuard#canActivate called');
    let url: string = state.url;
    
    return this.checkLogin(url);
  }

  canActiveChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    return this.canActivate(next, state);

  }

  checkLogin(url: string): boolean {
    if(this.authService.isLoggedIn){
      return true;
    }
    // save the attempted url for diredirecting later
    this.authService.redirectUrlAfterLogin = url;
    // navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }
}