import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { shopData } from '../../data';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from 'src/app/shared/services/services/product/product-catalog.service';
import { Catalog } from 'src/app/shared/models/product/catalog.model';
import { PlantingDifficultyLevel } from 'src/app/shared/models/product/planting-difficulty-level.model';
import { PlantingDifficultyLevelService } from 'src/app/shared/services/services/product/planting-difficulty-level.service';

@Component({
	selector: 'molla-shop-sidebar-one',
	templateUrl: './shop-sidebar-one.component.html',
	styleUrls: ['./shop-sidebar-one.component.scss']
})

export class ShopSidebarOneComponent implements OnInit {

	@Input() toggle = false;
	shopData = shopData;
	params = {};
  catalogs: Catalog[]
  levels: PlantingDifficultyLevel[]

	constructor(
    public activeRoute: ActivatedRoute,
    public router: Router,
    private catalogService: CatalogService,
    private levelService: PlantingDifficultyLevelService
  ) {
	}

	ngOnInit(): void {
    this.catalogService.findAll().subscribe(data => this.catalogs = this.catalogService.flattenCatalogs(data))
    this.levelService.findAll().subscribe(data => this.levels = data._embedded.plantingDifficultyLevels)
	}

	containsAttrInUrl(type: string, value: string) {
		const currentQueries = this.params[type] ? this.params[type].split(',') : [];
		return currentQueries && currentQueries.includes(value);
	}

	getUrlForAttrs(type: string, value: string) {
		let currentQueries = this.params[type] ? this.params[type].split(',') : [];
		currentQueries = this.containsAttrInUrl(type, value) ? currentQueries.filter(item => item !== value) : [...currentQueries, value];
		return currentQueries.join(',');
	}

	onAttrClick(attr: string, value: string) {
		let url = this.getUrlForAttrs(attr, value);
		this.router.navigate([], { queryParams: { [attr]: this.getUrlForAttrs(attr, value), page: 1 }, queryParamsHandling: 'merge' });
	}

}
