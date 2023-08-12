import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarPageComponent } from './sidebar/sidebar.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
	{
		path: 'sidebar/:type',
		component: SidebarPageComponent
	},
	{
		path: 'sidebar',
		pathMatch: 'full',
		redirectTo: 'sidebar/list'
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'sidebar/list'
	},
	{
		path: 'nosidebar',
		pathMatch: 'full',
		redirectTo: 'nosidebar/boxed'
	},
	{
		path: 'wishlist',
		component: WishlistComponent
	},
];

@NgModule( {
	imports: [ RouterModule.forChild( routes ) ],
	exports: [ RouterModule ]
} )



export class ShopRoutingModule { };
