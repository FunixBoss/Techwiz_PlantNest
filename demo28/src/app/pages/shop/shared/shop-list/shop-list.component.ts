import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Wishlist2Service } from 'src/app/@core/services/account/wishlist2.service';

@Component({
	selector: 'molla-shop-list',
	templateUrl: './shop-list.component.html',
	styleUrls: ['./shop-list.component.scss']
})

export class ShopListComponent implements OnInit {

	@Input() products = [];
	@Input() loaded = false;

	constructor(
  ){ }

	ngOnInit(): void {
	}

}
