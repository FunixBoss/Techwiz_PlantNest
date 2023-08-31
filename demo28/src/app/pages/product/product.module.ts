import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { OwlModule } from 'angular-owl-carousel';

import { ProductRoutingModule } from './product-routing.module';

import { DefaultPageComponent } from './default/default.component';

import { GalleryDefaultComponent } from './shared/gallery/gallery-default/gallery-default.component';
import { GalleryStickyComponent } from './shared/gallery/gallery-sticky/gallery-sticky.component';
import { GalleryExtendComponent } from './shared/gallery/gallery-extend/gallery-extend.component';
import { GalleryMasonryComponent } from './shared/gallery/gallery-masonry/gallery-masonry.component';

import { DetailOneComponent } from './shared/details/detail-one/detail-one.component';
import { DetailTwoComponent } from './shared/details/detail-two/detail-two.component';
import { DetailThreeComponent } from './shared/details/detail-three/detail-three.component';

import { InfoOneComponent } from './shared/info-tabs/info-one/info-one.component';
import { InfoTwoComponent } from './shared/info-tabs/info-two/info-two.component';
import { InfoThreeComponent } from './shared/info-tabs/info-three/info-three.component';

import { RelatedProductsOneComponent } from './shared/related-products/related-products-one/related-products-one.component';
import { RelatedProductsTwoComponent } from './shared/related-products/related-products-two/related-products-two.component';
import { ToggleSidebarComponent } from './shared/toggle-sidebar/toggle-sidebar.component';
import { Gallery2Component } from './shared/gallery/gallery2/gallery2.component';
import { ProductDetailComponent } from './shared/details/product-detail/product-detail.component';
import { InfoNewComponent } from './shared/info-tabs/info-new/info-new.component';
import { RelatedNewComponent } from './shared/related-products/related-new/related-new.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [
    DefaultPageComponent,

    GalleryDefaultComponent,
    GalleryExtendComponent,
    GalleryStickyComponent,
    GalleryMasonryComponent,

    DetailOneComponent,
    DetailTwoComponent,
    DetailThreeComponent,

    InfoOneComponent,
    InfoTwoComponent,
    InfoThreeComponent,

    RelatedProductsOneComponent,
    RelatedProductsTwoComponent,
    ToggleSidebarComponent,
    Gallery2Component,
    ProductDetailComponent,
    InfoNewComponent,
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
