import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from "../_services/account/account.service";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this.toastr.error('You can\'t go there.')
        return this.router.parseUrl('/');
      })
    )
  }

}
