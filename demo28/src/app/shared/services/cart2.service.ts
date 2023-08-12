import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// RxJS
import { Subject, BehaviorSubject, Observable } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';

import { Product } from 'src/app/shared/classes/product';
import { CartItem } from 'src/app/shared/classes/cart-item';
import { cartItemsSelector } from 'src/app/core/selectors/selectors';
import {
  AddToCartAction,
  RemoveFromCartAction,
  UpdateCartAction,
} from 'src/app/core/actions/actions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Cart2Service {
  private _baseURL: string = 'http://localhost:9090/api/carts';
  public cartItems2: BehaviorSubject<any> = new BehaviorSubject([]);
  accountId=1;
  public cartItems: any = [];
  public cartStream: Subject<any> = new BehaviorSubject([]);
  public qtyTotal: Subject<number> = new BehaviorSubject(0);
  public priceTotal: Subject<number> = new BehaviorSubject(0);

  constructor(
    private store: Store<any>,
    private toastrService: ToastrService,
    private httpClient: HttpClient
  ) {
    this.getCartItems(this.accountId).subscribe((result) => {
      this.cartItems = result.cartDetails;
  
      this.cartItems2.next(result.cartDetails);
  
      this.qtyTotal.next(
        this.cartItems.reduce((acc, cur) => {
          return acc + cur.productVariant.quantity;
        }, 0)
      );
  
      this.priceTotal.next(
        this.cartItems.reduce((acc, cur) => {
          return acc + cur.productVariant.price;
        }, 0)
      );
    });
  }
  


 
  
  getCartItems(accountId: number): Observable<any> {
    const url = `${this._baseURL}/findAll?accountId=${accountId}`;
    return this.httpClient.get<any>(url);
  }
  // Product Add to Cart
  addToCart(product: Product, qty = 1) {
    if (this.canAddToCart(product, qty)) {
      this.store.dispatch(new AddToCartAction({ product, qty }));
      this.toastrService.success('Product added to Cart.');
    } else {
      this.toastrService.error("Sorry, you can't add that amount to the cart.");
    }
  }

  // Product Removed from the Cart
  removeFromCart(product) {
    console.log(product);
    this.removeFromCartBackend(this.accountId ,product.product.productId ,  product.productVariant.productVariantId );
  }

  removeFromCartBackend(accountId: number, productId: number, productVariantId: number): void {
    const removeUrl = `${this._baseURL}/remove`;
    const requestBody = {
      accountId: accountId,
      productId: productId,
      productVariantId: productVariantId
    };
    const index = this.cartItems.findIndex((item) => item.product.productId === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1); // Xóa sản phẩm khỏi danh sách wishlist
      this.cartItems2.next(this.cartItems);
      this.httpClient
        .post(removeUrl, requestBody)
        .subscribe(
          () => {
            this.toastrService.success('Product removed from Cart.');
          },
          (error) => {
            console.error('Error while removing product from Cart:', error);
          }
        );
    }
  }

  
  // Cart update
  updateCart(cartItems: CartItem[]) {
    this.store.dispatch(new UpdateCartAction({ cartItems }));
    this.toastrService.success('Cart Updated.');
  }

  // Check whether product is in Cart or not
  isInCart(product: Product): boolean {
    return this.cartItems.find((item) => item.id == product.id) ? true : false;
  }

  // Check where product could be added to the cart
  canAddToCart(product: Product, qty = 1) {
    var find = this.cartItems.find((item) => item.id == product.id);

    if (find) {
      if (
        product.stock == 0 ||
        (product.stock && product.stock < find.qty + qty)
      )
        return false;
      else return true;
    } else {
      if (product.stock == 0 || (product.stock && product.stock < qty))
        return false;
      else return true;
    }
  }
}
