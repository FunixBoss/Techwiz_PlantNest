import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'angular-owl-carousel';
import { NouisliderModule } from 'ng2-nouislider';

import { ShopRoutingModule } from './shop-routing.module';

import { SidebarPageComponent } from './sidebar/sidebar.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShopSidebarComponent } from './shared/shop-sidebar/shop-sidebar.component';
import { ShopListComponent } from './shared/shop-list/shop-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule( {
	declarations: [
		SidebarPageComponent,
		WishlistComponent,
		ShopSidebarComponent,
		ShopListComponent,
    CartComponent,
	  CheckoutComponent
	],
	imports: [
		CommonModule,
		ThemeModule,
		ShopRoutingModule,
		RouterModule,
		NgbModule,
		OwlModule,
		NouisliderModule
	]
} )

export class ShopModule { }
