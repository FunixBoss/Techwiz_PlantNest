import { Component, OnInit } from '@angular/core';
import { Cart2Service } from 'src/app/@core/services/account/cart2.service';
import { PRODUCT_IMAGE_DIRECTORY } from 'src/app/@core/services/image-storing-directory';

@Component({
	selector: 'molla-cart-menu',
	templateUrl: './cart-menu.component.html',
	styleUrls: ['./cart-menu.component.scss']
})

export class CartMenuComponent implements OnInit {
	PRODUCT_IMAGE_DIRECTORY = PRODUCT_IMAGE_DIRECTORY

	total =0 ;
	quantity=0;

	constructor(public cartService: Cart2Service) {

	}

	ngOnInit(): void {


	}

	removeFromCart(event: Event, product: any) {
		event.preventDefault();
		this.cartService.removeFromCart(product);
	}
}
