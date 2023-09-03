import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/@core/services/account/authentication.service';
import { Wishlist2Service } from 'src/app/@core/services/account/wishlist2.service';
import { ModalService } from 'src/app/@core/services/modal.service';
import { UtilsService } from 'src/app/@core/services/utils.service';


@Component({
	selector: 'molla-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

	@Input() containerClass = "container";
	@Input() wishCount = 0;

	constructor(
    public activeRoute: ActivatedRoute,
    public utilsService: UtilsService,
    public modalService: ModalService,
    public authenService: AuthenticationService,
    public toastrService: ToastrService,
    private router: Router,
    public wishlistService: Wishlist2Service,
  )  { }

	ngOnInit(): void {}

	showLoginModal(event: Event): void {
		event.preventDefault();
		this.modalService.showLoginModal();
	}

  logout() {
    this.authenService.logout()
    this.authenService.authChange()
    this.toastrService.success("Log out successfully!")
    this.router.navigateByUrl("/")
  }
}
