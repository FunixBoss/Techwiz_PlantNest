import { Component, OnInit, OnDestroy } from '@angular/core';

import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { Wishlist2Service } from 'src/app/shared/services/wishlist2.service';

@Component({
	selector: 'molla-wishlist-menu',
	templateUrl: './wishlist-menu.component.html',
	styleUrls: ['./wishlist-menu.component.scss']
})

export class WishlistMenuComponent implements OnInit, OnDestroy {

	constructor(public wishlistService: Wishlist2Service) { }

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
	}
}
