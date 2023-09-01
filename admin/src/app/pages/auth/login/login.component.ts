import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../@core/services/account/authentication.service';
import { Account } from '../../../@core/models/account/account.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToastState, UtilsService } from '../../../@core/services/utils.service';
import { HeaderType } from '../../../@core/enum/header-type.enum';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginFormGroup: FormGroup
  errorMessage: string;
  
  private subscriptions: Subscription[] = []

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private utilsService: UtilsService
  ) {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }


  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/admin/dashboard')
    }
  }

  login() {
    if(this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    this.subscriptions.push(
      this.authService.login(this.loginFormGroup.value).subscribe(
        (response: HttpResponse<Account>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN)
          this.authService.saveToken(token)
          this.authService.addAccountToLocalCache(response.body)
          this.router.navigateByUrl("/admin/dashboard")
          this.authService.authChange()
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.utilsService.updateToastState(new ToastState(error.error.message, "danger"))
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
