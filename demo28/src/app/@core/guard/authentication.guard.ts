import { AuthenticationService } from './../services/account/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isAccountLoggedIn();
  }

  private isAccountLoggedIn(): boolean {
    if(this.authenticationService.isLoggedIn()) return true

    this.router.navigate(['/login'])
    return false
  }
  
}
