import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterCriteria } from 'src/app/@core/models/filter-criteria';
import { Wishlist2Service } from 'src/app/@core/services/account/wishlist2.service';
import { ApiService } from 'src/app/@core/services/api.service';
import { ProductService } from 'src/app/@core/services/product/product.service';
import { UtilsService } from 'src/app/@core/services/utils.service';

@Component({
  selector: 'shop-sidebar-page',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarPageComponent implements OnInit {
  products = [];
  pageTitle = 'List';

  filters: FilterCriteria = {
    page: 1,
    pageSize: 10,
    totalElements: 0,
    searchTerm: null,
    catalog: null,
    size: null,
    level: null,
    orderBy: 'default'
  }
  toggle = false;
  loaded = false;
  firstLoad = false;

  constructor(
    public activeRoute: ActivatedRoute,
    public router: Router,
    public utilsService: UtilsService,
    public apiService: ApiService,
    public productService: ProductService,

  ) {
    this.activeRoute.queryParams.subscribe((params) => {
      this.loaded = false;

      this.filters.page = params['page'] ?? 1;
      this.filters.pageSize = params['pageSize'] ?? 10;
      this.filters.searchTerm = params['searchTerm'] ?? null;
      this.filters.catalog = params['catalog'] ?? null;
      this.filters.size = params['size'] ?? null;
      this.filters.level = params['level'] ?? null;
      this.filters.orderBy = params['orderBy'] ?? 'default' ;

      this.productService.findByPages(this.filters).subscribe((result) => {
        this.products = result.content;
        this.filters.totalElements = result.totalElements;
        this.loaded = true;
        if (!this.firstLoad) {
          this.firstLoad = true;
        }
        this.utilsService.scrollToPageContent();
      });
    });
  }

  ngOnInit(): void {
    if (window.innerWidth > 991) this.toggle = false;
    else this.toggle = true;
  }

  resetFilter() {

  }

  @HostListener('window: resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 991) this.toggle = false;
    else this.toggle = true;
  }

  changeOrderBy(event: any) {
    this.router.navigate([], {
      queryParams: { orderBy: event.currentTarget.value, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  toggleSidebar() {
    if ( document.querySelector('body').classList.contains('sidebar-filter-active'))
      document.querySelector('body').classList.remove('sidebar-filter-active');
    else document.querySelector('body').classList.add('sidebar-filter-active');
  }

  hideSidebar() {
    document.querySelector('body').classList.remove('sidebar-filter-active');
  }
}
