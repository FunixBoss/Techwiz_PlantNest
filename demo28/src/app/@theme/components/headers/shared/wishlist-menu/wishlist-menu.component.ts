import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/@core/services/account/authentication.service';
import { Wishlist2Service } from 'src/app/@core/services/account/wishlist2.service';


@Component({
	selector: 'molla-wishlist-menu',
	templateUrl: './wishlist-menu.component.html',
	styleUrls: ['./wishlist-menu.component.scss']
})

export class WishlistMenuComponent implements OnInit, OnDestroy {

	constructor(
    public wishlistService: Wishlist2Service,
    public authenService: AuthenticationService
  ) { }

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
	}
}
