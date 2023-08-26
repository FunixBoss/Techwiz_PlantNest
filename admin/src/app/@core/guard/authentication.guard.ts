import { AuthenticationService } from './../services/account/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastState, UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
    return state.url.includes("/admin/auth/login") || this.isAccountLoggedIn() ;
  }

  private isAccountLoggedIn(): boolean {
    if(this.authenticationService.isLoggedIn()) return true
    setTimeout(() => {
      this.utilsService.updateToastState(new ToastState('You need to log in to access this page!', "danger"))
    }, 500);
    this.router.navigateByUrl('/admin/auth/login')
    return false
  }
  
}
