import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './User';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'https://localhost:44337/api/Auth/';
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public login(user: User) {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    const options = { headers: headers };
    return this.http.post<any>(this.URL + 'login', user, options).pipe(
      map((response: any) => {
        const data = response;

        if (data) {
          localStorage.setItem('token', data.tokenString);
          var decoded = jwt_decode(data.tokenString);
          console.dir(decoded);
        }
      })
    );
  }
  getIsAuth() {
    //return this.isAuthenticated;
  }
  public loggedIn() {}
  public logout() {}
  public register(user: User) {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    const options = { headers: headers };
    return this.http.post<any>(this.URL + 'register', user, options);
  }
}
