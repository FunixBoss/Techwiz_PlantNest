import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../../models/product/product.model';
import { HttpClient } from '@angular/common/http';
import { CartRequest } from '../../models/cart/cartRequest.model';
import { Router } from '@angular/router';
import { BaseURLService } from '../base-url.service';
import { Wishlist } from '../../models/account/wishlist.model';
import { AuthenticationService } from './authentication.service';
import { Account } from '../../models/account/account.model';
@Injectable({
  providedIn: 'root'
})
export class Wishlist2Service {
  wishlist: Product[] = []
  wishlistStream: Subject<any> = new BehaviorSubject([]);
  wishlistQty: Subject<number> = new BehaviorSubject(0);

  constructor(
    private store: Store<any>,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private baseUrlService: BaseURLService,
    private authenService: AuthenticationService
  ) {
    if(authenService.isLoggedIn()) {

    }
  }

  loadWishlist() {
    this.findAll().subscribe(items => {
      this.wishlist = items;
      this.wishlistStream.next(items);
      this.wishlistQty.next(items.length);
    })
  }

  findAll(): Observable<Product[]> {
    const loggedInAccount: Account = this.authenService.getAccountFromLocalCache()
    const url = `${this.baseUrlService.baseURL}/findAll/${loggedInAccount.id}`;
    return this.httpClient.get<Product[]>(url);
  }

  isInWishlist(product: Product): boolean {
    return this.wishlist.find((item) => item.productId == product.productId) ? true : false;
  }

  addToWishList(product): void {
    if (!this.isInWishlist(product)) {
      this.addToWishlistBackend(product);
    }
  }

  private addToWishlistBackend(product) {
    const loggedInAccount: Account = this.authenService.getAccountFromLocalCache()
    const url = `${this.baseUrlService.baseURL}/wishlist/add?accountId=${loggedInAccount.id}&productId=${product.productId}`;

    this.httpClient.get(url).subscribe(
      (item) => {
        if (item) {
          this.wishlist.push(product);
          this.wishlistStream.next(this.wishlist);
          this.wishlistQty.next(this.wishlist.length);
          this.toastrService.success('Product added to Wishlist.');
        }
      },
      (error) => {
        console.error('Error while adding product to Wishlist:', error);
      }
    );
  }

  removeFromWishList(product): void {
    const loggedInAccount: Account = this.authenService.getAccountFromLocalCache()

    const productId = product.productId;
    const removeUrl = `${this.baseUrlService.baseURL}/wishlist/remove?accountId=${loggedInAccount.id}&productId=${productId}`;
    const index = this.wishlist.findIndex((item) => item.productId === product.productId);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
      this.removeFromWishlistFrontend(removeUrl);
    }
  }

  private removeFromWishlistFrontend(removeUrl): void {
    this.httpClient.get(removeUrl).subscribe(
      () => {
        this.wishlistStream.next(this.wishlist);
        this.wishlistQty.next(this.wishlist.length);
        this.toastrService.success('Product was removed from wishlist.');
      },
      (error) => {
        console.error('Error while removing product from Wishlist:', error);
      }
    );

  }

}
