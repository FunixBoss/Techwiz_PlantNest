import { VARIANT_IMAGE_DIRECTORY } from './../../../../../@core/services/image-storing-directory';
import { PRODUCT_IMAGE_DIRECTORY } from 'src/app/@core/services/image-storing-directory';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { Product } from 'src/app/@core/models/product/product.model';

@Component({
  selector: 'product-gallery-default',
  templateUrl: './gallery-default.component.html',
  styleUrls: ['./gallery-default.component.scss'],
})
export class GalleryDefaultComponent implements OnInit {
  PRODUCT_IMAGE_DIRECTORY = PRODUCT_IMAGE_DIRECTORY
  VARIANT_IMAGE_DIRECTORY = VARIANT_IMAGE_DIRECTORY

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

  constructor(public lightBox: Lightbox) {}

  @HostListener('window:resize', ['$event'])
  closeLightBox(event: Event) {
    this.lightBox.close();
  }

  ngOnChanges() {
    this.album = this.product.imageUrls.map(url => {
      return {
        src: this.PRODUCT_IMAGE_DIRECTORY + url,
        thumb: this.PRODUCT_IMAGE_DIRECTORY + url,
        caption: this.product.productName,
      }
    })
    this.product.productVariants.forEach(variant => {
      this.album.push({
        src: this.VARIANT_IMAGE_DIRECTORY + variant.imageUrl,
        thumb: this.VARIANT_IMAGE_DIRECTORY + variant.imageUrl,
        caption: "Variant Size: " + variant.productSize.sizeName,
      })
      this.album.push({
        src: this.VARIANT_IMAGE_DIRECTORY + variant.imageUrl,
        thumb: this.VARIANT_IMAGE_DIRECTORY + variant.imageUrl,
        caption: "Variant Size: " + variant.productSize.sizeName,
      })
      this.album.push({
        src: this.VARIANT_IMAGE_DIRECTORY + variant.imageUrl,
        thumb: this.VARIANT_IMAGE_DIRECTORY + variant.imageUrl,
        caption: "Variant Size: " + variant.productSize.sizeName,
      })
    })

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
