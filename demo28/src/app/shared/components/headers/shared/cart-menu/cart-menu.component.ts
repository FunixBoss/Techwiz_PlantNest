import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/shared/services/cart.service';
import { Cart2Service } from 'src/app/shared/services/account/cart2.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'molla-cart-menu',
	templateUrl: './cart-menu.component.html',
	styleUrls: ['./cart-menu.component.scss']
})

export class CartMenuComponent implements OnInit {

	PRODUCT_IMAGE_DIRECTORY: string = 'http://localhost:9090/assets/upload/product/'
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
