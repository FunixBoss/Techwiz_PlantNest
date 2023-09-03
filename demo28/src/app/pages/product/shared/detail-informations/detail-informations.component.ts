import { Component, OnInit, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductVariant } from 'src/app/@core/models/product/product-variant.model';
import { Product } from 'src/app/@core/models/product/product.model';
import { ProductSale } from 'src/app/@core/models/sale/product-sale.model';
import { Wishlist2Service } from 'src/app/@core/services/account/wishlist2.service';


import { CartService } from 'src/app/@core/services/cart.service';

declare var $: any;

@Component({
	selector: 'product-detail-informations',
	templateUrl: './detail-informations.component.html',
	styleUrls: ['./detail-informations.component.scss']
})

export class DetailInformationsComponent implements OnInit {
	@Input() product: Product;
	selectedVariant: ProductVariant

  inWishlist: boolean = false;
  maxQuantity = 1
	qty = 1;

	constructor(
		public cartService: CartService,
		public wishlistService: Wishlist2Service,
    private toastrService: ToastrService,
		public router: Router,
		public el: ElementRef) {
	}

  ngOnInit() {
    this.wishlistService.isInWishlist(this.product).subscribe(result => {
      this.inWishlist = result
    });
  }

	addCart(event: Event) {
		event.preventDefault();
		if ((event.currentTarget as HTMLElement).classList.contains('btn-disabled')) return;

		let newProduct = { ...this.product };
		// if (this.product.variants.length > 0) {
		// 	newProduct = {
		// 		...this.product,
		// 		name:
		// 			this.product.name +
		// 			' - ' +
		// 			this.selectedVariant.colorName +
		// 			', ' +
		// 			this.selectedVariant.size,
		// 		price: this.selectedVariant.price
		// 	};
		// }

		this.cartService.addToCart(
			newProduct, this.qty
		);
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

	selectVariant(event) {
    if(event != null) {
      this.maxQuantity = event.quantity
    }
  }

	onChangeQty(current: number) {
		this.qty = current;
	}

  calcPriceAfterSale(rootPrice, productSale: ProductSale): number {
    if(productSale.productSaleType.typeName == "Fixed") {
      return (rootPrice - productSale.discount > 0) ? rootPrice - productSale.discount : 0
    } else {
      return (rootPrice * (1 - productSale.discount/100))
    }
  }
}
