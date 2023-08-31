import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountService } from './services/account/account.service';
import { AddressService } from './services/account/address.service';
import { Cart2Service } from './services/account/cart2.service';
import { Wishlist2Service } from './services/account/wishlist2.service';
import { OrderStatusService } from './services/order/order-status.service';
import { OrderService } from './services/order/order.service';
import { PaymentMethodService } from './services/order/payment-method.service';
import { PlantingDifficultyLevelService } from './services/product/planting-difficulty-level.service';
import { CatalogService } from './services/product/product-catalog.service';
import { ProductCouponService } from './services/product/product-coupon.service';
import { ProductReviewService } from './services/product/product-review.service';
import { ProductSaleService } from './services/product/product-sale.service';
import { ProductSizeService } from './services/product/product-size.service';
import { ProductService } from './services/product/product.service';
import { ApiService } from './services/api.service';
import { BaseURLService } from './services/base-url.service';
import { CartService } from './services/cart.service';
import { ModalService } from './services/modal.service';
import { UtilsService } from './services/utils.service';
import { Utils2Service } from './services/utils2.service';
import { WishlistService } from './services/wishlist.service';
import { StoreService } from './store/store.service';

const SERVICES: any[] = [
  AccountService,
  AddressService,
  Cart2Service,
  Wishlist2Service,

  OrderStatusService,
  OrderService,
  PaymentMethodService,

  PlantingDifficultyLevelService,
  CatalogService,
  ProductCouponService,
  ProductReviewService,
  ProductSaleService,
  ProductSizeService,
  ProductService,

  ApiService,
  BaseURLService,
  CartService,
  ModalService,
  UtilsService,
  Utils2Service,
  WishlistService,

  StoreService

]

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
  providers: [...SERVICES]
})
export class CoreModule { }
