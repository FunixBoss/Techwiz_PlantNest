import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/shared/services/modal.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { introSlider, brandSlider, serviceSlider, bannerSlider } from '../data';
import { ProductService } from 'src/app/shared/services/services/product/product.service';

@Component({
  selector: 'molla-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  products = [];
  posts = [];
  topProducts = [];
  featuredProducts = [];
  loaded = false;
  introSlider = introSlider;
  brandSlider = brandSlider;
  serviceSlider = serviceSlider;
  bannerSlider = bannerSlider;

  constructor(
    public apiService: ApiService,
    public utilsService: UtilsService,
    private productService: ProductService
  ) {
    this.productService.findAll().subscribe((result) => {
      this.products = result;
      // this.posts = result.blogs;
      this.topProducts = result.filter((item) => {
        return item.top == true;
      });
      this.featuredProducts = result.filter((item) => {
        return item.sale == true;
      });
      this.loaded = true;
    });
    console.log();
    
  }

  ngOnInit(): void {}
}
