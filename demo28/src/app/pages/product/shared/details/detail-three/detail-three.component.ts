import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/@core/models/product/product.model';


import { CartService } from 'src/app/@core/services/cart.service';
import { WishlistService } from 'src/app/@core/services/wishlist.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
	selector: 'product-detail-three',
	templateUrl: './detail-three.component.html',
	styleUrls: ['./detail-three.component.scss']
})

export class DetailThreeComponent implements OnInit {
	@Input() product: Product;

  maxQuantity = 100
	variationGroup = [];
	selectableGroup = [];
	sizeArray = [];
	colorArray = [];
	selectedVariant = {
		price: null,
		size: ""
	};
	qty = 1;

	SERVER_URL = environment.SERVER_URL;

	constructor(
		public cartService: CartService,
		public wishlistService: WishlistService,
		public router: Router,
		public el: ElementRef) {
	}

	ngOnInit(): void {
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

	selectSize(event: Event) {
		if (this.selectedVariant.size == 'null') {
			this.selectedVariant = { ...this.selectedVariant, size: "" };
		}
		if ($(event.target).val() == "") {
			this.selectedVariant = { ...this.selectedVariant, size: "" };
		} else {
			this.selectedVariant = { ...this.selectedVariant, size: $(event.target).val() };
		}
	}

	onChangeQty(current: number) {
		this.qty = current;
	}
}
