import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from 'src/app/@core/services/modal.service';
import { CartService } from 'src/app/@core/services/cart.service';

import { environment } from 'src/environments/environment';
import { Product } from 'src/app/@core/models/product/product.model';
import { Wishlist2Service } from 'src/app/@core/services/account/wishlist2.service';
import { ProductSale } from 'src/app/@core/models/sale/product-sale.model';
import { PRODUCT_IMAGE_DIRECTORY } from 'src/app/@core/services/image-storing-directory';

@Component({
  selector: 'molla-product-nine',
  templateUrl: './product-nine.component.html',
  styleUrls: ['./product-nine.component.scss'],
})
export class ProductNineComponent implements OnInit {
  @Input() product: Product;

  PRODUCT_IMAGE_DIRECTORY: string = PRODUCT_IMAGE_DIRECTORY

  constructor(
    private router: Router,
    private wishlistService: Wishlist2Service,
  ) {}

  ngOnInit(): void {
  }

  addToWishlist(event: Event) {
    event.preventDefault();

    if (this.isInWishlist()) {
      this.router.navigate(['/shop/wishlist']);
    } else {
      this.wishlistService.addToWishList(this.product);
    }
  }

  isInWishlist() {
    return this.wishlistService.isInWishlist(this.product);
  }

  calcPriceAfterSale(rootPrice, productSale: ProductSale): number {
    if(productSale.productSaleType.typeName == "Fixed") {
      return (rootPrice - productSale.discount > 0) ? rootPrice - productSale.discount : 0
    } else {
      return (rootPrice * (1 - productSale.discount/100))
    }
  }
}
