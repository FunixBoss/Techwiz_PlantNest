import { Component, OnInit, Renderer2, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FilterOrderCriteria } from 'src/app/@core/models/filter-order-criteria';
import { Order } from 'src/app/@core/models/order/order.model';
import { OrderService } from 'src/app/@core/services/order/order.service';
import { UtilsService } from 'src/app/@core/services/utils.service';


@Component({
  selector: 'molla-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(NgbNav, { static: true }) ngbNavCpn: NgbNav;
  private subscriptions: Subscription[] = []
  filters: FilterOrderCriteria = {
    page: 1,
    pageSize: 4,
    totalElements: null,
    searchTerm: null,
    orderBy: 'default'
  }

  tabs = [
    {
      tabIndex: 1,
      tabName: 'dashboard',
      fragment: 'dashboard',
      label: "Dashboard"
    },
    {
      tabIndex: 2,
      tabName: "orders",
      fragment: "orders",
      label: "Orders"
    },
    {
      tabIndex: 3,
      tabName: "addresses",
      fragment: "addresses",
      label: "Adresses"
    },
    {
      tabIndex: 4,
      tabName: "account-details",
      fragment: "account-details",
      label: "Account Details"
    },
  ]
  selectingTabIndex: number = 1
  orders: Order[]
  loadedOrders: boolean = false;


  constructor(
    public activatedRoute: ActivatedRoute,
    public orderService: OrderService,
    public el: ElementRef,
    public renderer: Renderer2,
    public utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.fragment.subscribe(fragment => {
        switch (fragment) {
          case 'dashboard': {
            this.selectTab(this.tabs.find(tab => tab.tabName == 'dashboard'))
            break;
          }
          case 'orders': {
            this.selectTab(this.tabs.find(tab => tab.tabName == 'orders'))
            break;
          }
          case 'addresses': {
            this.selectTab(this.tabs.find(tab => tab.tabName == 'addresses'))
            break;
          }
          case 'account-details': {
            this.selectTab(this.tabs.find(tab => tab.tabName == 'accounts-details'))
            break;
          }
          default: {
            this.selectTab(this.tabs.find(tab => tab.tabName == 'dashboard'))
            break;
          }
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscr => subscr.unsubscribe());
  }

  selectTab(tab: any) {
    this.ngbNavCpn.select(tab.tabName);
    this.selectingTabIndex = tab.tabIndex;
    switch (tab.tabName) {
      case 'dashboard': {
        this.loadDashboard();
        break;
      }
      case 'orders': {
        this.subscriptions.push(
          this.activatedRoute.queryParams.subscribe((params) => {
            this.filters.page = params['page'] ?? 1;
            this.filters.pageSize = params['pageSize'] ?? 4;
            this.filters.searchTerm = params['searchTerm'] ?? null;
            this.filters.orderBy = params['orderBy'] ?? 'default' ;

            this.loadOrders()
          })
        )
        break;
      }
      case 'addresses': {
        this.loadAddresses()
        break;
      }
    }
  }

  loadDashboard() {

  }

  loadAddresses() {

  }

  loadOrders() {
    this.subscriptions.push(
      this.orderService.findByPages(this.filters).subscribe((result) => {
        this.loadedOrders = true
        this.orders = result.content;
        this.filters.totalElements = result.totalElements;
        this.utilsService.scrollToPageContent();
      })
    )
  }

}
