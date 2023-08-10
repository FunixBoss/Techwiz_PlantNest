import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BaseURLService } from '../base-url.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Account } from '../../models/account/account.model';
import { Address } from '../../models/address/address.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;
  private loggedInEmail: string;
  private jwtHelper = new JwtHelperService();

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient,
  ) { }

  login(account: Account): Observable<HttpResponse<any> | HttpErrorResponse> {
    const url = `${this.baseUrlService.baseURL}/login`;
    return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(url, account, {observe: 'response'}) 
  }

  register(account: Account): Observable<HttpResponse<any> | HttpErrorResponse> {
    const url = `${this.baseUrlService.baseURL}/register`;
    return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(url, account) 
  }

  logout(): void {
    this.token = null;
    this.loggedInEmail = null;
    localStorage.removeItem('account')
    localStorage.removeItem('token')
    localStorage.removeItem('accounts')
  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token)
  }

  loadToken(): void {
    this.token = localStorage.getItem('token')
  }

  getToken(): string {
    return this.token;
  }

  addAccountToLocalCache(account: Account): void {
    localStorage.setItem('account', JSON.stringify(account));
  }

  getAccountFromLocalCache(): Account {
    return JSON.parse(localStorage.getItem('account'))
  }

  isLoggedIn(): boolean {
    this.loadToken()
    if(this.token != null && this.token !== '') {
      if(this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInEmail = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logout()
      return false;
    }
  }
}
