import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';


@Component({
  selector: 'molla-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  tabs = [
    {
      tabIndex: 1,
      tabName: "tab-1",
      label: "Dashboard"
    }
  ]
  selectingTabIndex: number = 1

	constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  viewTab($event: Event, prevId: number, nextId: number) {
		$event.preventDefault();
		let nodes = this.el.nativeElement.querySelectorAll(".nav-dashboard .nav-link");
		this.renderer.removeClass(nodes[prevId], 'active');
		this.renderer.addClass(nodes[nextId], 'active');
	}
}
