import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/@core/services/account/authentication.service';


@Component({
	selector: 'molla-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit, OnDestroy {

	constructor(
    public authenService: AuthenticationService
  ) { }

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
	}
}
