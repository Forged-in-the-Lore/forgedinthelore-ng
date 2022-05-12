import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NavComponent} from './nav/nav/nav.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorInterceptor} from "./_interceptors/error.interceptor";
import {JwtInterceptor} from "./_interceptors/jwt.interceptor";
import {LoadingInterceptor} from "./_interceptors/loading.interceptor";
import {MatSpinnerOverlayComponent} from './mat-spinner-overlay/mat-spinner-overlay/mat-spinner-overlay.component';
import {HasRoleDirective} from './_directives/has-role.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MatSpinnerOverlayComponent,
    HasRoleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
