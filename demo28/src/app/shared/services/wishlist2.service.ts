import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

import { wishlistSelector } from 'src/app/core/selectors/selectors';
import {
  AddToWishListAction,
  RemoveFromWishListAction,
  AddToCartAction,
} from 'src/app/core/actions/actions';
import { Product } from '../models/product/product.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Wishlist2Service {
  wishlist = [];


  wishlistStream: Subject<any> = new BehaviorSubject([]);
  wishlistQty: Subject<number> = new BehaviorSubject(0);
  private _baseURL: string = "http://localhost:9090/api/wishlists"
  private _removeWishlistURL: string = "http://localhost:9090/api/wishlists/remove";

  constructor(private store: Store<any>, private toastrService: ToastrService, private httpClient: HttpClient) {
    // store.pipe(select(wishlistSelector)).subscribe((items) => {
    //   this.wishlist = items;
    //   this.wishlistStream.next(items);
    //   this.wishlistQty.next(items.length);
    //   console.log(items);
    // });

    this.findAll().subscribe(
      items=>{
        this.wishlist = items;
        this.wishlistStream.next(items);
        this.wishlistQty.next(items.length);
        console.log(items);
      }
    )
    
      
  }
  test(product){
    console.log(this.wishlist.findIndex((item) => item.id === product.productId) === -1);
    
  }
  findAll(): Observable<Product[]> {
    const url = `${this._baseURL}/findAll/2`;
    return this.httpClient.get<Product[]>(url);
  }
  // Product add to Wishlist
  addToWishList(product): void {
    if (this.wishlist.findIndex((item) => item.id === product.productId) === -1) {
      this.store.dispatch(new AddToWishListAction({ product }));
      this.toastrService.success('Product added to Wishlist.');
    }
  }

  // // Product removed from Wishlist
  // removeFromWishList(product): void {
  //   this.store.dispatch(new RemoveFromWishListAction({ product }));
  //   this.toastrService.success('Product removed from Wishlist.');
  // }

  // Product moved from Wishlist to Cart
  moveToCart(product): void {
    this.store.dispatch(new RemoveFromWishListAction({ product }));
    this.store.dispatch(new AddToCartAction({ product, qty: 1 }));
    this.toastrService.success('Product moved to Cart.');
  }

  // Check whether product is in Wishlist or not
  isInWishlist(product: Product): boolean {
    return this.wishlist.find((item) => item.id == product.productId) ? true : false;
  }

  removeFromWishList(product): void {
    const accountId = 2; // Thay bằng accountId thích hợp
    const productId = product.productId;
    const removeUrl = `${this._removeWishlistURL}?accountId=${accountId}&productId=${productId}`;
    const index = this.wishlist.findIndex((item) => item.productId === product.productId);
    if (index !== -1) {
      this.wishlist.splice(index, 1); // Xóa sản phẩm khỏi danh sách wishlist
      this.wishlistStream.next(this.wishlist);
      this.wishlistQty.next(this.wishlist.length);
      this.removeFromWishlistFrontend(product,removeUrl);
    }
  }

  // Xóa sản phẩm khỏi danh sách yêu thích ở phía frontend
  private removeFromWishlistFrontend(product ,removeUrl ): void {
    this.httpClient.get(removeUrl).subscribe(
      () => {
        // Xóa sản phẩm khỏi danh sách yêu thích ở phía frontend sau khi xóa thành công
        this.toastrService.success('Product removed from Wishlist.');
      },
      (error) => {
        console.error('Error while removing product from Wishlist:', error);
      }
    );
    
  }
  
}
