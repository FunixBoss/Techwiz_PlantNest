import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// RxJS
import { Subject, BehaviorSubject, Observable } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';

import { Product } from '../../classes/product';
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

      // this.cartItems2.next(result.cartDetails);

      // this.cartItems = result.cartDetails;


      this.cartItems = this.cartItems.reduce((acc, cur) => {
        acc.push({
          ...cur,
          sum: cur.quantity * cur.productVariant.price
        });
        return acc;
      }, [])
      this.cartItems2.next(this.cartItems);
      console.log(this.cartItems);





      this.qtyTotal.next(
        this.cartItems.reduce((acc, cur) => {
          return acc + cur.quantity;
        }, 0)
      );

      this.priceTotal.next(
        this.cartItems.reduce((acc, cur) => {
          return acc + cur.productVariant.price * cur.quantity;
        }, 0)
      );
    });
  }

  updateCart(product, qty = 1) {
      const addToCartUrl = `${this._baseURL}/add`;

      const requestBody = {
        accountId: this.accountId,
        productId: product.product.productId,
        productVariantId: product.productVariant.productVariantId,
        quantity: qty,
      };

      this.httpClient.post(addToCartUrl, requestBody).subscribe(
        () => {}
      );

  }


  getCartItems(accountId: number): Observable<any> {
    const url = `${this._baseURL}/findAll?accountId=${accountId}`;
    return this.httpClient.get<any>(url);
  }
  // Product Add to Cart
  addToCart(product, qty =1) {

      const addToCartUrl = `${this._baseURL}/add`;
      const requestBody = {
        accountId: this.accountId,
        productId: product.productId,
        productVariantId: product.productVariants[0].productVariantId,
        quantity: qty,
      };

      console.log(requestBody);


      this.httpClient.post(addToCartUrl, requestBody).subscribe(
        () => {
          this.toastrService.success('Success');
        },
        (error) => {
          this.toastrService.error("Failed to add product to Cart. Please try again later.");
        }
      );

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




  // Check whether product is in Cart or not
  isInCart(product: Product): boolean {
    return this.cartItems.find((item) => item.id == product.id) ? true : false;
  }

  // Check where product could be added to the cart
  canAddToCart(product: Product, qty = 1) {

    var find = this.cartItems.find((item) => item.id == product.id);

    if (find) {
        return true;
    } else {
        return false;
    }
  }



}
