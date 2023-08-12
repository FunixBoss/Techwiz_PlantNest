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
import { CartRequest } from '../models/cart/cartRequest.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductVariant } from '../models/product/product-variant.model';
@Injectable({
  providedIn: 'root'
})
export class Wishlist2Service {
  wishlist = [];
   accountId = 1;
 
  wishlistStream: Subject<any> = new BehaviorSubject([]);
  wishlistQty: Subject<number> = new BehaviorSubject(0);
  private _baseURL: string = "http://localhost:9090/api/wishlists"
  private _removeWishlistURL: string = "http://localhost:9090/api/wishlists/remove";
  private _addTowishList: string = `http://localhost:9090/api/wishlists/add?accountId=${this.accountId}&`;

  constructor(private store: Store<any>, private toastrService: ToastrService, private httpClient: HttpClient,
    private router:Router) {

    this.findAll().subscribe(
      items=>{
        this.wishlist = items;
        this.wishlistStream.next(items);
        this.wishlistQty.next(items.length);
        }
    )
  }
  test(product){
    this.addToWishList(product)
  }
  findAll(): Observable<Product[]> {
    const url = `${this._baseURL}/findAll/${this.accountId}`;
    return this.httpClient.get<Product[]>(url);
  }
  // Product add to Wishlist
  addToWishList(product): void {
    if (!this.isInWishlist(product)) {
      this.addToWishlistBackend(product);
    }
  }
  private addToWishlistBackend(product , qty=1) {
    const productId = product.productId;
    // const productVariantId = product.productVariant.productVariantId; // Thay bằng id sản phẩm phù hợp
    const addUrl = `${this._addTowishList}productId=${productId}`;
    
    this.httpClient.get(addUrl).subscribe(
      (item) => {
        if(item){
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



  // // Product removed from Wishlist
  // removeFromWishList(product): void {
  //   this.store.dispatch(new RemoveFromWishListAction({ product }));
  //   this.toastrService.success('Product removed from Wishlist.');
  // }

  // Product moved from Wishlist to Cart
  moveToCart(product): void {
    console.log(product);
    
    const accountId = this.accountId; // Thay thế bằng accountId thích hợp
    const productId = product.productId;

    // API URL for removing product from wishlist
    const removeWishlistUrl = `${this._removeWishlistURL}?accountId=${accountId}&productId=${productId}`;
    
    // API URL for adding product to cart
    const addToCartUrl = `http://localhost:9090/api/carts/add`;
    const requestBody:CartRequest = {
      accountId: accountId,
      productId: productId,
      productVariantId: product.ProductVariant.productVariantId,
      quantity: 1, // Số lượng sản phẩm bạn muốn thêm vào giỏ hàng (1 trong trường hợp này)
    };

    // Gửi API để xóa sản phẩm khỏi danh sách yêu thích
    this.httpClient.get(removeWishlistUrl).subscribe(
      () => { 
        // Xóa sản phẩm khỏi wishlist thành công, bây giờ thêm sản phẩm vào giỏ hàng
        this.httpClient.post(addToCartUrl, requestBody).subscribe(
          () => {
            // Thêm sản phẩm vào giỏ hàng thành công
            
            this.toastrService.success('Product moved to Cart.');
          },
          (error) => {
            console.error('Error while adding product to Cart:', error);
          }
        );
      },
      (error) => {
        console.error('Error while removing product from Wishlist:', error);
      }
    );
  }

  // Check whether product is in Wishlist or not
  isInWishlist(product: Product): boolean {
    return this.wishlist.find((item) => item.productId == product.productId) ? true : false;
  }

  removeFromWishList(product): void {
    const accountId = this.accountId; // Thay bằng accountId thích hợp
    const productId = product.productId;
    const removeUrl = `${this._removeWishlistURL}?accountId=${accountId}&productId=${productId}`;
    const index = this.wishlist.findIndex((item) => item.productId === product.productId);
    if (index !== -1) {
      this.wishlist.splice(index, 1); // Xóa sản phẩm khỏi danh sách wishlist
      this.removeFromWishlistFrontend(product,removeUrl);
    }
  }

  // Xóa sản phẩm khỏi danh sách yêu thích ở phía frontend
  private removeFromWishlistFrontend(product ,removeUrl ): void {
    this.httpClient.get(removeUrl).subscribe(
      () => {
        this.wishlistStream.next(this.wishlist);
        this.wishlistQty.next(this.wishlist.length);
        // Xóa sản phẩm khỏi danh sách yêu thích ở phía frontend sau khi xóa thành công
        this.toastrService.success('Product removing Wishlist.');
      },
      (error) => {
        console.error('Error while removing product from Wishlist:', error);
      }
    );
    
  }
  
}
