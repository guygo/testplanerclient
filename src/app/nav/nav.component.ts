import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService) { }
  title = 'TestPlanerClient';
  userState: boolean;
  ngOnInit() {
    this.auth.currentUserstatus.subscribe(status => this.userState = status);
  }
  logout()
  {
    this.auth.userToken = null;
    this.auth.logout();
    localStorage.removeItem('token');
    console.log('logged out');
    this.auth.currentUserstatus.subscribe(status => this.userState = status);
  }
 loggedIn()
 {

   const token = localStorage.getItem('token');
   return !!token;
 }
}
