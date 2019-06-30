import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceApi } from '../services/api/auth-api.service';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(
    private authService: AuthServiceApi,
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
    this.router.navigate(['/login']);
    return false;
  }
  
}
