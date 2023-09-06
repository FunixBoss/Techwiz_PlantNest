import { map } from 'rxjs/operators';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/@core/models/product/product.model';
import { Accordion } from '../accordion-data';

@Component({
  selector: 'molla-info-tabs',
  templateUrl: './info-tabs.component.html',
  styleUrls: ['./info-tabs.component.scss'],
})
export class InfoTabsComponent implements OnInit, OnChanges {
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
