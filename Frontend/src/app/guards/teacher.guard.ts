import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceApi } from '../services/api/auth-api.service';
import { Role } from '../model/role';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {

  constructor(
    private authService: AuthServiceApi,
    private router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    let user = this.authService.currentUserValue;
    console.log(user);
    if(user && user.role == Role.TEACHER){
      return true;
    }

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
