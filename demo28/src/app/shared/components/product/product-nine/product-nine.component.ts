import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from 'src/app/shared/services/modal.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CompareService } from 'src/app/shared/services/compare.service';

import { environment } from 'src/environments/environment';
import { Product } from 'src/app/shared/models/product/product.model';
import { Wishlist2Service } from 'src/app/shared/services/wishlist2.service';

@Component({
  selector: 'molla-product-nine',
  templateUrl: './product-nine.component.html',
  styleUrls: ['./product-nine.component.scss'],
})
export class ProductNineComponent implements OnInit {
  @Input() product: Product;

  maxPrice = 0;
  minPrice = 99999;
  PRODUCT_IMAGE_DIRECTORY: string =
    'http://localhost:9090/assets/upload/product/';
  SERVER_URL = environment.SERVER_URL;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private cartService: CartService,
    private wishlistService: Wishlist2Service,
    private compareService: CompareService
  ) {}

  ngOnInit(): void {
    this.minPrice = this.product.minPrice;
    this.maxPrice = this.product.maxPrice;
  }

  addToCart(event: Event) {
    event.preventDefault();
    // this.cartService.addToCart(this.product);
  }

  addToWishlist(event: Event) {
    event.preventDefault();

    if (this.isInWishlist()) {
      this.router.navigate(['/shop/wishlist']);
    } else {
      this.wishlistService.addToWishList(this.product);
    }
  }

  addToCompare(event: Event) {
    event.preventDefault();
    // if (this.isInCompare()) return;
    // this.compareService.addToCompare(this.product);
  }

  quickView(event: Event) {
    event.preventDefault();
    // this.modalService.showQuickView(this.product);
  }

  isInCompare() {
    // return this.compareService.isInCompare(this.product);
  }

  isInWishlist() {
    return this.wishlistService.isInWishlist(this.product);
  }
}
