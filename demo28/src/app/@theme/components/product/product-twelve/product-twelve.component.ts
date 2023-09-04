import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Product } from 'src/app/@core/models/product/product.model';
import { Wishlist2Service } from 'src/app/@core/services/account/wishlist2.service';
import { ProductSale } from 'src/app/@core/models/sale/product-sale.model';
import { PRODUCT_IMAGE_DIRECTORY } from 'src/app/@core/services/image-storing-directory';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'molla-product-twelve',
  templateUrl: './product-twelve.component.html',
  styleUrls: ['./product-twelve.component.scss'],
})
export class ProductTwelveComponent implements OnInit {
  @Input() product: Product;
  @Input() addClass = '';
  @Input() isShownSold = true;

  PRODUCT_IMAGE_DIRECTORY = PRODUCT_IMAGE_DIRECTORY
  maxPrice = 0;
  minPrice = 0;
  hasOnlyOnePrice: boolean = true;
  inWishlist: boolean = false;

  constructor(
    private router: Router,
    private wishlistService: Wishlist2Service,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.minPrice = this.product.minPrice;
    this.maxPrice = this.product.maxPrice;

    this.hasOnlyOnePrice = (this.minPrice == this.maxPrice)

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
          this.wishlistService.notifyWishlistChange()
          this.inWishlist = result
          this.product.totalLikes += 1
          this.toastrService.success('Product added to Wishlist.');
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
