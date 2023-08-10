import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product/product.model';

@Component({
  selector: 'molla-info-new',
  templateUrl: './info-new.component.html',
  styleUrls: ['./info-new.component.scss'],
})
export class InfoNewComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  ngOnInit(): void {}

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
