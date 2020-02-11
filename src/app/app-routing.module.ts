import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from './auth/auth.guard'


const appRoutes: Routes = [
  {
      path: 'login',
      component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
},

  {
     path: '',
    redirectTo: '/',
    pathMatch: 'full'
    
  },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
