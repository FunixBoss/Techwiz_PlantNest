import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { introSlider, brandSlider, serviceSlider, bannerSlider } from '../data';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'molla-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  topProducts = [];
  loadedTopProduct = false;

  saleProducts = [];
  loadedSaleProduct = false;

  introSlider = introSlider;
  brandSlider = brandSlider;
  serviceSlider = serviceSlider;
  bannerSlider = bannerSlider;

  constructor(
    public apiService: ApiService,
    public utilsService: UtilsService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.find10SaleProduct().subscribe((result) => {
      this.saleProducts = result
      this.loadedSaleProduct = true
    })

    this.productService.findTop10Products().subscribe((result) => {
      this.topProducts = result
      this.loadedTopProduct = true
    })
  }
}
