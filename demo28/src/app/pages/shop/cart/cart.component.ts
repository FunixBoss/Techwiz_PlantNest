import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/shared/services/cart.service';

import { environment } from 'src/environments/environment';
import { Cart2Service } from 'src/app/shared/services/cart2.service';

@Component({
	selector: 'shop-cart-page',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {

	cartItems = [];
	SERVER_URL = environment.SERVER_URL;
	shippingCost = 0;
	PRODUCT_IMAGE_DIRECTORY: string = 'http://localhost:9090/assets/upload/product/' 
	total =0 ;
	private subscr: Subscription;

	constructor(private store: Store<any>, public cartService: Cart2Service) {
	}

	ngOnInit() {
		
		this.subscr = this.cartService.cartItems2.subscribe(items => {
			this.cartItems = items;
		  });

		  this.cartService.priceTotal.subscribe(items => {
			this.total = items
		  });
		  console.log(this.cartItems);
		  
	}

	ngOnDestroy() {
		this.subscr.unsubscribe();
	}

	trackByFn(index: number, item: any) {
		if (!item) return null;
		return item.slug;
	}

	updateCart(event: any) {
		event.preventDefault();

		// event.target.parentElement.querySelector('.icon-refresh').classList.add('load-more-rotating');

		// setTimeout(() => {
		// 	this.cartService.updateCart(this.cartItems);
		// 	event.target.parentElement.querySelector('.icon-refresh').classList.remove('load-more-rotating');
		// 	document.querySelector('.btn-cart-update:not(.diabled)') && document.querySelector('.btn-cart-update').classList.add('disabled');
		// }, 400);
	}

	changeShipping(value: number) {
		this.shippingCost = value;
	}

	onChangeQty(event: number, product: any) {
		document.querySelector('.btn-cart-update.disabled') && document.querySelector('.btn-cart-update.disabled').classList.remove('disabled');

		this.cartItems = this.cartItems.reduce((acc, cur) => {
			if (cur.name === product.name) {
				acc.push({
					...cur,
					qty: event,
					sum: (cur.sale_price ? cur.sale_price : cur.price) * event
				});
			}
			else acc.push(cur);

			return acc;
		}, [])
	}
}