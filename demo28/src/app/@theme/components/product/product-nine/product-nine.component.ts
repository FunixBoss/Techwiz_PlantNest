import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from 'src/app/@core/services/modal.service';
import { CartService } from 'src/app/@core/services/cart.service';

import { environment } from 'src/environments/environment';
import { Product } from 'src/app/@core/models/product/product.model';
import { Wishlist2Service } from 'src/app/@core/services/account/wishlist2.service';
import { ProductSale } from 'src/app/@core/models/sale/product-sale.model';
import { PRODUCT_IMAGE_DIRECTORY } from 'src/app/@core/services/image-storing-directory';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'molla-product-nine',
  templateUrl: './product-nine.component.html',
  styleUrls: ['./product-nine.component.scss'],
})
export class ProductNineComponent implements OnInit {

  @Input() product: Product;
  PRODUCT_IMAGE_DIRECTORY: string = PRODUCT_IMAGE_DIRECTORY
  inWishlist: boolean = false;

  constructor(
    private router: Router,
    private wishlistService: Wishlist2Service,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.wishlistService.isInWishlist(this.product).subscribe(result => {
      this.inWishlist = result
    });
  }

  addToWishlist(event: Event) {
    event.preventDefault();
    if(this.inWishlist) {
      this.router.navigateByUrl("/shop/wishlist")
      return
    }

    this.wishlistService.addToWishList(this.product).subscribe(
      (result: boolean) => {
        if (result) {
          this.inWishlist = result
          this.product.totalLikes += 1
          this.toastrService.success('Product added to Wishlist.');
          this.wishlistService.notifyWishlistChange()
        }
      },
      (error) => {
        console.error('Error while adding product to Wishlist:', error);
      }
    );;
  }

  calcPriceAfterSale(rootPrice, productSale: ProductSale): number {
    if(productSale.productSaleType.typeName == "Fixed") {
      return (rootPrice - productSale.discount > 0) ? rootPrice - productSale.discount : 0
    } else {
      return (rootPrice * (1 - productSale.discount/100))
    }
  }
}
