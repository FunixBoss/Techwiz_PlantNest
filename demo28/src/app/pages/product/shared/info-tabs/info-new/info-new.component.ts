import { map } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Accordion } from 'src/app/pages/elements/accordions/accordion-data';
import { Product } from 'src/app/shared/models/product/product.model';

@Component({
  selector: 'molla-info-new',
  templateUrl: './info-new.component.html',
  styleUrls: ['./info-new.component.scss'],
})
export class InfoNewComponent implements OnInit, OnChanges {
  @Input() product: Product;
  accordion: Accordion = {
    cards: [
      // card1, card2, card3
    ]
  }
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    const mappedCards = Object.keys(this.product.productCareGuide)
      .filter(key => key !== 'productId')
      .map(key => ({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        icon: 'icon-heart-o',
        body: this.product.productCareGuide[key]
      }));
    this.accordion.cards = mappedCards
  }

  setRating = (event: any) => {
    event.preventDefault();

    if (event.currentTarget.parentNode.querySelector('.active')) {
      event.currentTarget.parentNode
        .querySelector('.active')
        .classList.remove('active');
    }

    event.currentTarget.classList.add('active');
  };
}
