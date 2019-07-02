import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceApi } from '../services/api/auth-api.service';
import { Role } from '../model/role';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthServiceApi,
    private router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    let user: User = this.authService.getAuthenticatedUser();
    console.log(user);
    if(user){
      if(user.role == Role.ADMIN){
        return true;
      }
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
