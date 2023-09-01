import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { productSlider } from '../data';

@Component({
  selector: 'molla-recommend-collection',
  templateUrl: './recommend-collection.component.html',
  styleUrls: ['./recommend-collection.component.scss']
})
export class RecommendCollectionComponent implements OnInit, OnChanges {

  @Input() products = [];
  @Input() loaded = false;

	sliderOption = productSlider;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }
}
