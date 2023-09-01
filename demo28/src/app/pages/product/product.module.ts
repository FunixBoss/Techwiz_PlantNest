import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { OwlModule } from 'angular-owl-carousel';

import { ProductRoutingModule } from './product-routing.module';

import { DetailPageComponent } from './detail/detail.component';


import { RelatedProductsOneComponent } from './shared/related-products/related-products-one/related-products-one.component';
import { RelatedProductsTwoComponent } from './shared/related-products/related-products-two/related-products-two.component';
import { ToggleSidebarComponent } from './shared/toggle-sidebar/toggle-sidebar.component';
import { InfoTabsComponent } from './shared/info-tabs/info-tabs.component';
import { RelatedNewComponent } from './shared/related-products/related-new/related-new.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { PriceComponent } from './shared/price/price.component';
import { DetailInformationsComponent } from './shared/detail-informations/detail-informations.component';
import { GalleryComponent } from './shared/gallery/gallery.component';

@NgModule({
  declarations: [
    DetailPageComponent,
    PriceComponent,

    RelatedProductsOneComponent,
    RelatedProductsTwoComponent,
    ToggleSidebarComponent,
    GalleryComponent,
    DetailInformationsComponent,
    InfoTabsComponent,
    RelatedNewComponent,
  ],

  imports: [
    CommonModule,
    ProductRoutingModule,
    ThemeModule,
    RouterModule,
    NgbModule,
    OwlModule,
    LightboxModule,
    FormsModule
  ],

  exports: [],

  providers: [NgbModal],
})
export class ProductModule {}
