import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
  
})
export class NavComponent implements OnInit, OnDestroy  {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  username
  constructor(private auth: AuthService) { }
  title = 'TestPlanerClient';
  userState: boolean;
  ngOnInit() {
    this.userIsAuthenticated = this.auth.getIsAuth();
   
    this.username=this.auth.getUserName();
    
    this.authListenerSubs = this.auth
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  logout()
  {
    this.auth.logout();
  }
 loggedIn()
 {

   const token = localStorage.getItem('token');
   return !!token;
 }
 ngOnDestroy() {
  this.authListenerSubs.unsubscribe();
}


}
