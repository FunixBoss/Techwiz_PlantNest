import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/@core/models/product/product.model';
import { ApiService } from 'src/app/@core/services/api.service';
import { PRODUCT_IMAGE_DIRECTORY } from 'src/app/@core/services/image-storing-directory';
import { ProductService } from 'src/app/@core/services/product/product.service';

@Component({
  selector: 'product-detail-page',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailPageComponent implements OnInit {
  PRODUCT_IMAGE_DIRECTORY = PRODUCT_IMAGE_DIRECTORY;
  product: Product;
  prev: Product;
  next: Product;
  related = [];
  loaded = false;

  constructor(
    public apiService: ApiService,
    private activeRoute: ActivatedRoute,
    public router: Router,
    private productService: ProductService
  ) {
    // activeRoute.params.subscribe((params) => {
    //   this.loaded = false;
    //   this.apiService.getSingleProduct(params['slug']).subscribe((result) => {
    //     if (result === null) {
    //       this.router.navigate(['/pages/404']);
    //     }

    //     this.product = result.product;
    //     this.prev = result.prevProduct;
    //     this.next = result.nextProduct;
    //     this.related = result.relatedProducts;
    //     this.loaded = true;

    //     console.log(result);
    //   });
    this.productService.findById(2).subscribe((result) => {
      this.product = result;
      this.loaded = true;
    });
    // this.productService.findAll().subscribe((result) => {
    //   if (result === null) {
    //     this.router.navigate(['/pages/404']);
    //   }

    //   this.product = result.productName;
    //   this.prev = result.prevProduct;
    //   this.next = result.nextProduct;
    //   this.related = result.relatedProducts;
    //   this.loaded = true;
    // });
  }

  ngOnInit(): void {}
}
