import { Component, OnInit, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductVariant } from 'src/app/@core/models/product/product-variant.model';
import { Product } from 'src/app/@core/models/product/product.model';
import { ProductSale } from 'src/app/@core/models/sale/product-sale.model';


import { CartService } from 'src/app/@core/services/cart.service';
import { WishlistService } from 'src/app/@core/services/wishlist.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
	selector: 'product-detail-informations',
	templateUrl: './detail-informations.component.html',
	styleUrls: ['./detail-informations.component.scss']
})

export class DetailInformationsComponent {
	@Input() product: Product;
	selectedVariant: ProductVariant

  maxQuantity = 1
	qty = 1;

	constructor(
		public cartService: CartService,
		public wishlistService: WishlistService,
		public router: Router,
		public el: ElementRef) {
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
