import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { Product } from 'src/app/@core/models/product/product.model';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'molla-gallery2',
  templateUrl: './gallery2.component.html',
  styleUrls: ['./gallery2.component.scss'],
})
export class Gallery2Component implements OnInit {
  @Input() product: Product;
  @Input() adClass = 'product-gallery-vertical';

  paddingTop = '100%';
  currentIndex = 0;
  album = [];
  lightBoxOption = {
    showImageNumberLabel: true,
    centerVertically: true,
    showZoom: true,
    fadeDuration: 0.2,
    albumLabel: '%1 / %2',
  };
  PRODUCT_IMAGE_DIRECTORY: string =
    'http://localhost:9090/assets/upload/product/';
  SERVER_URL = environment.SERVER_URL;

  constructor(public lightBox: Lightbox) {}

  @HostListener('window:resize', ['$event'])
  closeLightBox(event: Event) {
    this.lightBox.close();
  }

  ngOnChanges() {
    this.album = [];

    // for (let i = 0; i < this.product.imageUrl.length; i++) {
    //   this.album.push({
    //     src: this.SERVER_URL + this.product.imageUrl[i],
    //     thumb: this.SERVER_URL + this.product.imageUrl[i],
    //     caption: this.product.productName,
    //   });
    // }
    console.log(this.album);
  }

  ngOnInit(): void {
    // this.paddingTop =
    //   Math.floor(
    //     (parseFloat(this.product.pictures[0].height.toString()) /
    //       parseFloat(this.product.pictures[0].width.toString())) *
    //       1000
    //   ) /
    //     10 +
    //   '%';
  }

  changeImage($event: Event, index = 0) {
    this.currentIndex = index;
    $event.preventDefault();
  }

  openLightBox() {
    this.lightBox.open(this.album, this.currentIndex, this.lightBoxOption);
  }
}
