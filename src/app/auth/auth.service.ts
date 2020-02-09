import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import {User} from './User'
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject(false);
  currentUserstatus = this.loggedIn.asObservable();


  private URL="https://localhost:44337/api/Auth/"
  constructor( private http: HttpClient) { }
  public userToken:string
  public login(user:User)
  {
    const headers=new HttpHeaders({'Content-type':'application/json'});
    const options= ({headers:headers});
    return this.http.post<any>(this.URL+"login",user,options).pipe(
      map((response:any)=>{
        const data=response;

        if(data){
          localStorage.setItem('token',data.tokenString);
          this.userToken=data.tokenString;
          this.loggedIn.next(true);
        }
    }));
  }
  public logout()
  {
    this.loggedIn.next(false);
  }
  public register(user:User)
  {
    const headers=new HttpHeaders({'Content-type':'application/json'});
    const options= ({headers:headers});
    return this.http.post<any>(this.URL+"register",user,options);
  }
}
