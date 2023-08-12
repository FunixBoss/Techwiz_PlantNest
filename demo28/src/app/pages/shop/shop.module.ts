import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'angular-owl-carousel';
import { NouisliderModule } from 'ng2-nouislider';

import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { SidebarPageComponent } from './sidebar/sidebar.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShopSidebarOneComponent } from './shared/sidebar/shop-sidebar-one/shop-sidebar-one.component';
import { ShopSidebarTwoComponent } from './shared/sidebar/shop-sidebar-two/shop-sidebar-two.component';
import { ShopSidebarThreeComponent } from './shared/sidebar/shop-sidebar-three/shop-sidebar-three.component';
import { ShopListOneComponent } from './shared/list/shop-list-one/shop-list-one.component';
import { ShopListTwoComponent } from './shared/list/shop-list-two/shop-list-two.component';
import { ShopListThreeComponent } from './shared/list/shop-list-three/shop-list-three.component';
import { CartComponent } from './cart/cart.component';

@NgModule( {
	declarations: [
		SidebarPageComponent,
		WishlistComponent,
		ShopSidebarOneComponent,
		ShopSidebarTwoComponent,
		ShopSidebarThreeComponent,
		ShopListOneComponent,
		ShopListTwoComponent,
		ShopListThreeComponent,
    CartComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ShopRoutingModule,
		RouterModule,
		NgbModule,
		OwlModule,
		NouisliderModule
	]
} )

export class ShopModule { }
