import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { CompareService } from 'src/app/shared/services/compare.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/shared/models/product/product.model';
import { ProductVariant } from 'src/app/shared/models/product/product-variant.model';
import { Cart2Service } from 'src/app/shared/services/cart2.service';

declare var $: any;
@Component({
  selector: 'molla-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnChanges {
  @Input() product: Product;
  hasOnlyOnePrice: boolean;
  selectedVariant: ProductVariant;

  qty = 1;
  PRODUCT_IMAGE_DIRECTORY: string = 'http://localhost:9090/assets/upload/product/';
  SERVER_URL = environment.SERVER_URL;

  constructor(
    public cart2Service: Cart2Service,
    public wishlistService: WishlistService,
    public compareService: CompareService,
    public router: Router,
    public el: ElementRef
  ) {}

  ngOnInit(): void {
    // this.refreshSelectableGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.hasOnlyOnePrice = this.product.minPrice == this.product.maxPrice
  }


  @HostListener('window:scroll', ['$event'])
  handleScroll(event: Event) {
    if (document.querySelector('.default-page')) {
      this.scrollHandler();
    }
  }

  addCart(event: Event) {
    event.preventDefault();

    this.cart2Service.addToCart(
      {
        productId: this.product.productId,
        productVariantId: this.selectedVariant.productVariantId,
      }, this.qty
    )
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

  selectVariant(event) {
    this.selectedVariant = event
    console.log(this.selectedVariant);
  }

  onChangeQty(current: number) {
    this.qty = current;
  }

  scrollHandler() {
    let stickyBar = this.el.nativeElement.querySelector('.sticky-bar');
    if (
      stickyBar.classList.contains('d-none') &&
      this.el.nativeElement.getBoundingClientRect().bottom < 0
    ) {
      stickyBar.classList.remove('d-none');
      return;
    }
    if (
      !stickyBar.classList.contains('d-none') &&
      this.el.nativeElement.getBoundingClientRect().bottom > 0
    ) {
      stickyBar.classList.add('d-none');
    }
  }
}
