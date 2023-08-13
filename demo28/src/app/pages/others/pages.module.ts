import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { OwlModule } from 'angular-owl-carousel';
import { GoogleMapsModule } from '@angular/google-maps';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { AboutTwoPageComponent } from './about-two/about-two.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactOnePageComponent } from './contact-one/contact-one.component';
import { InfoComponent } from './info/info.component';

@NgModule( {
	declarations: [
		AboutTwoPageComponent,
		PageNotFoundComponent,
		ContactOnePageComponent,
  InfoComponent,
	],

	imports: [
		CommonModule,
		PagesRoutingModule,
		SharedModule,
		NgbModule,
		RouterModule,
		OwlModule,
		GoogleMapsModule,
		HttpClientModule,
		HttpClientJsonpModule
	]
} )

export class PagesModule { }
