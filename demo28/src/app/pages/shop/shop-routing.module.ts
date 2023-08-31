import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarPageComponent } from './sidebar/sidebar.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { InfoComponent } from '../others/info/info.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
	{
		path: 'list',
		component: SidebarPageComponent
	},
	{
		path: 'list',
		pathMatch: 'full',
		redirectTo: 'list'
	},
	{
		path: 'wishlist',
		component: WishlistComponent
	},
	{
		path: 'cart',
		component: CartComponent
	},{
		path: 'checkout',
		component: CheckoutComponent
	},

];

@NgModule( {
	imports: [ RouterModule.forChild( routes ) ],
	exports: [ RouterModule ]
} )



export class ShopRoutingModule { };
