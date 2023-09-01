import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/services/account/authentication.service';
import { ModalService } from 'src/app/@core/services/modal.service';
import { UtilsService } from 'src/app/@core/services/utils.service';


@Component({
	selector: 'molla-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

	@Input() containerClass = "container";

	wishCount = 0;

	constructor(
    public activeRoute: ActivatedRoute,
    public utilsService: UtilsService,
    public modalService: ModalService,
    public authenService: AuthenticationService,
    private router: Router
  )  { }

	ngOnInit(): void {
	}

	showLoginModal(event: Event): void {
		event.preventDefault();
		this.modalService.showLoginModal();
	}

  logout() {
    this.authenService.logout()
    this.authenService.authChange()
    this.router.navigateByUrl("/")
  }
}
