import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Cart3Service } from 'src/app/@core/services/account/cart3.service';
import { PRODUCT_IMAGE_DIRECTORY } from 'src/app/@core/services/image-storing-directory';
import { CartDetail } from 'src/app/@core/models/cart/cart-detail.model';
import { Cart } from 'src/app/@core/models/cart/cart.model';
import { ProductSale } from 'src/app/@core/models/sale/product-sale.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'shop-cart-page',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {
  PRODUCT_IMAGE_DIRECTORY = PRODUCT_IMAGE_DIRECTORY
  private subscr: Subscription;
  cart: Cart;
  totalQty = 0;
  totalPrice = 0;
  shippingCost = 0;

  constructor(
    private store: Store<any>,
    public cartService: Cart3Service,
    public toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.subscr = this.cartService.findAll().subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  updateCart(event: any) {
    event.preventDefault();
  }

  remove(cartDetail: CartDetail) {
    this.cartService.remove(cartDetail.product, cartDetail.productVariant).subscribe(result => {
      if(result) {
        this.toastrService.success("Product removed successfully!")
      } else {
        this.toastrService.error("Product removed failed! Some error happened")
      }
    })
  }

  ngOnChanges() {

  }

  onChangeQty(event: number, product: any) {
    document.querySelector('.btn-cart-update.disabled') &&
      document.querySelector('.btn-cart-update.disabled').classList.remove('disabled');

  }

  calcPriceAfterSale(rootPrice, productSale: ProductSale): number {
    if(productSale.productSaleType.typeName == "Fixed") {
      return (rootPrice - productSale.discount > 0) ? rootPrice - productSale.discount : 0
    } else {
      return (rootPrice * (1 - productSale.discount/100))
    }
  }

  changeShipping(value: number) {

  }
}
