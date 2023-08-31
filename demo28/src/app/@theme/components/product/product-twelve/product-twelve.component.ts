import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Product } from 'src/app/@core/models/product/product.model';
import { Wishlist2Service } from 'src/app/@core/services/account/wishlist2.service';
import { ProductSale } from 'src/app/@core/models/sale/product-sale.model';

@Component({
  selector: 'molla-product-twelve',
  templateUrl: './product-twelve.component.html',
  styleUrls: ['./product-twelve.component.scss'],
})
export class ProductTwelveComponent implements OnInit {
  @Input() product: Product;
  @Input() addClass = '';
  @Input() isShownSold = true;

  maxPrice = 0;
  minPrice = 0;
  hasOnlyOnePrice: boolean = true;

  PRODUCT_IMAGE_DIRECTORY: string = 'http://localhost:9090/assets/upload/product/';
  SERVER_URL = environment.SERVER_URL;

  constructor(
    private router: Router,
    private wishlistService: Wishlist2Service,
  ) {}

  ngOnInit(): void {
    this.minPrice = this.product.minPrice;
    this.maxPrice = this.product.maxPrice;

    this.hasOnlyOnePrice = (this.minPrice == this.maxPrice)
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
