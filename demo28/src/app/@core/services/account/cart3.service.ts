import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseURLService } from '../base-url.service';
import { CartRequest } from '../../models/cart/cartRequest.model';
import { AuthenticationService } from './authentication.service';
import { Account } from '../../models/account/account.model';
import { Cart } from '../../models/cart/cart.model';
import { Product } from '../../models/product/product.model';
import { ProductVariant } from '../../models/product/product-variant.model';
import { Coupon } from '../../models/coupon/coupon.model';

@Injectable({
  providedIn: 'root',
})
export class Cart3Service {
  cartChangeSubject: Subject<void> = new Subject();
  cart: Cart

  constructor(
    private httpClient: HttpClient,
    private baseUrlService: BaseURLService,
    private authenService: AuthenticationService
  ) {
    this.findAll().subscribe(cart => this.cart = cart)
  }

  findAll(): Observable<Cart> {
    const loggedInAccount: Account = this.authenService.getAccountFromLocalCache()
    const url = `${this.baseUrlService.baseURL}/carts/findAll?accountId=${loggedInAccount.id}`;
    return this.httpClient.get<Cart>(url);
  }

  addOrUpdateCartItem(product, variant, qty): Observable<boolean> {
    const loggedInAccount: Account = this.authenService.getAccountFromLocalCache()
    const url = `${this.baseUrlService.baseURL}/carts/add`;
    const cartRequest =
      new CartRequest(loggedInAccount.id, product.productId, variant.productVariantId, qty)

    return this.httpClient.post<boolean>(url, cartRequest)
  }

  remove(product: Product, variant: ProductVariant): Observable<boolean> {
    const loggedInAccount: Account = this.authenService.getAccountFromLocalCache()
    const url = `${this.baseUrlService.baseURL}/carts/remove`;
    const cartRequest =
      new CartRequest(loggedInAccount.id, product.productId, variant.productVariantId)

    return this.httpClient.post<boolean>(url, cartRequest)
  }

  canAddToCart(variant: ProductVariant, qty: number): Observable<boolean> {
    const url = `${this.baseUrlService.baseURL}/carts/canAddToCart`;

    return this.httpClient.post<boolean>(url, {
      productVariantI: variant.productVariantId,
      quantity: qty
    })
  }

  getTotalPriceAndQty(cart: Cart): {totalPrice: number, totalQuantity: number} {
    let totalPrice: number = 0
    let totalQty: number = 0
    cart.cartDetails.forEach(detail => {
      totalQty += detail.quantity
      totalPrice += this.calcPriceAfterSale(detail.product, detail.productVariant) * detail.quantity
    })
    return { totalPrice: totalPrice, totalQuantity: totalQty }
  }

  calcPriceAfterSale(product: Product, variant: ProductVariant): number {
    if(product.productSale == null) return variant.price

    if(product.productSale.productSaleType.typeName == 'Fixed') {
      return variant.price - product.productSale.discount > 0 ? variant.price - product.productSale.discount : 0
    } else {
      return variant.price * (1 - product.productSale.discount/100)
    }
  }

  calcPriceAfterAppliedCoupon(price: number, coupon: Coupon): number {
    if(coupon == null) return price

    if(coupon.couponType.typeName == 'Fixed') {
      return price - coupon.discount > 0 ? price - coupon.discount : 0
    } else {
      return price * (1 - coupon.discount / 100)
    }
  }

}
