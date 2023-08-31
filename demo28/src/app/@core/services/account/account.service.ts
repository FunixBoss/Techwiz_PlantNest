import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../models/account/account.model';
import { Address } from '../../models/address/address.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // for changing when create, edit, delete => reload
  private accountChangeSubject = new Subject<void>();

  get accountChange$(): Observable<void> {
    return this.accountChangeSubject.asObservable();
  }

  notifyAccountChange(): void {
    this.accountChangeSubject.next();
  }

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient,
  ) {
  }

  findAll(): Observable<Account[]> {
    const url: string = `${this.baseUrlService.baseURL}/accounts/findAll`
    return this.httpClient.get<Account[]>(url)
  }

  findById(id: number): Observable<Account> {
    const url: string = `${this.baseUrlService.baseURL}/accounts/findById/${id}`
    return this.httpClient.get<Account>(url);
  }

  countTotalComments(id: number): Observable<number> {
    const url: string = `${this.baseUrlService.baseURL}/accounts/${id}/countComments`
    return this.httpClient.get<number>(url);
  }

  update(account: Account): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/accounts/update`
    return this.httpClient.post<boolean>(url, account);
  }

  isEmailExists(email: string): Observable<boolean> {
    const url: string = `${this.baseUrlService.baseURL}/accounts/isEmailExist?email=${email}`
    return this.httpClient.get<boolean>(url);
  }

  findAllAddress(): Observable<Address[]> {
    const url: string = `${this.baseUrlService.baseURL}/address`
    return this.httpClient.get<Address[]>(url)
  }

}