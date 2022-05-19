import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavComponent} from './nav/nav/nav.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./_interceptors/error.interceptor";
import {JwtInterceptor} from "./_interceptors/jwt.interceptor";
import {LoadingInterceptor} from "./_interceptors/loading.interceptor";
import {MatSpinnerOverlayComponent} from './shared/mat-spinner-overlay/mat-spinner-overlay/mat-spinner-overlay.component';
import {HasRoleDirective} from './_directives/has-role.directive';
import {TextInputComponent} from "./_forms/text-input/text-input.component";
import {RegisterComponent} from "./account/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SettingDashboardComponent } from './setting/setting-dashboard/setting-dashboard.component';
import {NotFoundComponent} from "./errors/not-found/not-found.component";
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "./_modules/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { SignupComponent } from './account/signup/signup.component';
import { LoginComponent } from './account/login/login.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MatSpinnerOverlayComponent,
    HasRoleDirective,
    TextInputComponent,
    RegisterComponent,
    SettingDashboardComponent,
    NotFoundComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
