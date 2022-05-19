import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from "../../_services/account/account.service";
import {ToastrService} from "ngx-toastr";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FormControlService} from "../../_services/form-control.service";
import {LoginDto} from "../../_dtos/login-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = {} as FormGroup
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder, private router: Router, public helper: FormControlService) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    })
    this.loginForm.controls.password.valueChanges.subscribe(() => {
      this.loginForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  login() {
    const loginDto: LoginDto = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.accountService.login(loginDto).subscribe(response => {
      this.router.navigateByUrl('/settings');
      return response;
    }, error => {
      this.validationErrors = error;
    })
  }
}
