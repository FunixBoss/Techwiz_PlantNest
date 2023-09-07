import { Component, OnInit, ElementRef, Renderer2, Input } from '@angular/core';

@Component({
	selector: 'dashboard-dashboard-tab',
	templateUrl: './dashboard-tab.component.html',
	styleUrls: ['./dashboard-tab.component.scss']
})

export class DashboardTabComponent implements OnInit {

  @Input() nav: any

	constructor() {
  }

	ngOnInit(): void {
	}

}
