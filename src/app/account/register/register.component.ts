import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from "../../_services/account/account.service";
import {ToastrService} from "ngx-toastr";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FormControlService} from "../../_services/form-control.service";
import {RegisterDto} from "../../_dtos/register-dto";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = {} as FormGroup
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder, private router: Router, public helper: FormControlService) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      // @ts-ignore
      return control?.value === control?.parent?.controls[matchTo].value ? null : {notMatching: true};
    }
  }

  register() {
    const registerDto: RegisterDto = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }
    this.accountService.register(registerDto).subscribe(response => {
      this.registerForm.reset()
      return response;
    }, error => {
      this.validationErrors = error;
    })
  }
}
