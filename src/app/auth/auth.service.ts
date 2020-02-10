import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './User';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'https://localhost:44337/api/Auth/';
  private userId: any;
  private token: any;
  private tokenTimer: any;
  private isAuthenticated = false;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  
  public login(user: User) {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    const options = { headers: headers };
    return this.http.post<any>(this.URL + 'login', user, options).pipe(
      map((response: any) => {
        const data = response;
        6

        if (data) {
          this.token = data.tokenString;
          var decoded = jwt_decode(this.token);
          const expiresInDuration = decoded.exp;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = decoded.nameid;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration);
          console.log(expirationDate);
          this.saveAuthData(this.token, expirationDate, this.userId);
          this.router.navigate(["/"]);
        }
      })
    );
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getToken() {
    return this.token;
  }
  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  public loggedIn() { }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn );
      this.authStatusListener.next(true);
    }
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
  public register(user: User) {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    const options = { headers: headers };
    return this.http.post<any>(this.URL + 'register', user, options);
  }
}
