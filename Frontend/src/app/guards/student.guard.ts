import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if(this.authService.isLoggedIn){
      let role = this.authService.getAuthenticatedUser().role;
      if(role == Role.STUDENT){
        return true;
      }
      return false;
    }
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
  
}
