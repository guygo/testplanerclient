import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MyUsedModule} from './material-module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS }  from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavComponent,
    RegisterComponent,
    SideNavComponent
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyUsedModule,
    HttpClientModule,
    FormsModule,
    AngularToastifyModule
   ],
  providers: [
    AuthGuard,
    ToastService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
