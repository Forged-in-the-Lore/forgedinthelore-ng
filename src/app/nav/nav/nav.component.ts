import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../_services/account/account.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.accountService.refreshCurrentUser()
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
