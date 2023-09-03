import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { AccountService } from "../services/account/account.service";

export function isEmailNotExisting(accountService: AccountService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return accountService.isEmailExists(control.value).pipe(
          map((exists: boolean) => (!exists ? { emailNotExists: true } : null)),
          catchError(() => of(null))
      );
  };
}

