import { Component, OnInit, Input } from '@angular/core';
import { Wishlist2Service } from '../../services/account/wishlist2.service';

@Component({
	selector: 'molla-page-header',
	templateUrl: './page-header.component.html',
	styleUrls: ['./page-header.component.scss']
})

export class PageHeaderComponent implements OnInit {

	@Input() containerClass = "container";
	@Input() image = 'assets/images/page-header-bg.jpg';
	@Input() subtitle: string;
	@Input() title: string;

	constructor(public wishlistService: Wishlist2Service) {

	}

	ngOnInit(): void {
	}
}
