import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlModule } from 'angular-owl-carousel';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ElementsRoutingModule } from './elements-routing.module';

import { AccordionsPageComponent } from './accordions/accordion.component';
import { BannersPageComponent } from './banners/banner.component';
import { ButtonsPageComponent } from './buttons/button.component';
import { CallToActionPageComponent } from './call-to-action/call-to-action.component';
import { IconBoxesPageComponent } from './icon-boxes/icon-box.component';
import { ProductCategoryPageComponent } from './product-category/product-category.component';
import { TabsPageComponent } from './tabs/tab.component';
import { TestimonialPageComponent } from './testimonials/testimonial.component';
import { TitlesPageComponent } from './titles/title.component';
import { TypographyPageComponent } from './typography/typography.component';
import { ElementsListPageComponent } from './elements-list/elements-list.component';
import { ElementsListComponent } from './shared/elements-list/elements-list.component';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule( {
	declarations: [
		AccordionsPageComponent,
		BannersPageComponent,
		ButtonsPageComponent,
		CallToActionPageComponent,
		IconBoxesPageComponent,
		ProductCategoryPageComponent,
		TabsPageComponent,
		TestimonialPageComponent,
		TitlesPageComponent,
		TypographyPageComponent,
		ElementsListPageComponent,
		ElementsListComponent,
	],

	imports: [
		CommonModule,
		LazyLoadImageModule,
		ElementsRoutingModule,
		ThemeModule,
		NgbModule,
		OwlModule
	],

	exports: [
		ElementsListComponent
	],

	providers: [
		NgbModal
	]
} )

export class ElementsModule { }
