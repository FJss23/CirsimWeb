import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,
          CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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

      let currentUser = this.authService.getCurrentUser();
      let withoutRole = -1;
      if(currentUser){
        if(next.data.roles && next.data.roles.indexOf(currentUser.role) == withoutRole){
          // If the role is not authorized, redirect it to home
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }
      
      // If you have not logged in, I'll redirect you to login
      this.router.navigate(['/login']);
      return false;
  }

  canActiveChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    return this.canActivate(next, state);
  }
}