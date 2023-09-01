import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/@core/enum/header-type.enum';
import { Account } from 'src/app/@core/models/account/account.model';
import { AuthenticationService } from 'src/app/@core/services/account/authentication.service';

@Component({
	selector: 'molla-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {
  private subscriptions: Subscription[] = []
  loginFormGroup: FormGroup
  errorMessage: string;
	constructor(
    private formBuilder: FormBuilder,
    private authenService: AuthenticationService
  ) {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

	ngOnInit(): void {
	}

	closeModal() {
		let modal = document.querySelector('.login-modal') as HTMLElement;
		if (modal)
			modal.click();
	}

  login() {
    if(this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    this.subscriptions.push(
      this.authenService.login(this.loginFormGroup.value).subscribe(
        (response: HttpResponse<Account>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN)
          this.authenService.saveToken(token)
          this.authenService.addAccountToLocalCache(response.body)
          this.authenService.authChange()
          this.closeModal()
        },
        (error) => {
          this.errorMessage = "Invalid username/password"
          console.log(error);
        }
      )
    )
  }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
