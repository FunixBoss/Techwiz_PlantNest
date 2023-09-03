import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { routeAnimation } from '../data';
import { Wishlist2Service } from 'src/app/@core/services/account/wishlist2.service';

@Component({
	selector: 'molla-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
	animations: [
		routeAnimation
	]
})

export class LayoutComponent implements OnInit, OnDestroy {

	containerClass = 'container';
	isBottomSticky = false;
	current = "/";
  wishCount = 0
	private subscr: Subscription;

	constructor(
    private router: Router,
    public wishlistService: Wishlist2Service,
  ) {
		this.subscr = this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.current = event.url;
				if (this.current.includes('fullwidth')) {
					this.containerClass = 'container-fluid';
				} else {
					this.containerClass = 'container';
				}

				if (this.current.includes('product/detail') && (window.innerWidth > 991)) {
					this.isBottomSticky = true;
				} else {
					this.isBottomSticky = false;
				}
			} else if (event instanceof NavigationEnd) {
				this.current = event.url;
				if (this.current.includes('fullwidth')) {
					this.containerClass = 'container-fluid';
				} else {
					this.containerClass = 'container';
				}

				if (this.current.includes('product/detail') && (window.innerWidth > 991)) {
					this.isBottomSticky = true;
				} else {
					this.isBottomSticky = false;
				}
			}
		});
	}

	ngOnInit(): void {
    this.wishlistService.wishlistChangeSubject.subscribe(() => {
      this.loadWishlist()
    })
    this.loadWishlist()
	}

  loadWishlist() {
    this.wishlistService.countTotal().subscribe(qty => {
      console.log(qty);
      this.wishCount = qty
    })
  }

	ngOnDestroy(): void {
		this.subscr.unsubscribe();
	}

	@HostListener('window:resize', ['$event'])
	handleKeyDown(event: Event) {
		this.resizeHandle()
	}

	prepareRoute (outlet: RouterOutlet) {
		return outlet && outlet.isActivated && outlet.activatedRoute && outlet.activatedRoute.url;
	}

	resizeHandle() {
		if (this.current.includes('product/default') && window.innerWidth > 992)
			this.isBottomSticky = true;
		else
			this.isBottomSticky = false;
	}
}
