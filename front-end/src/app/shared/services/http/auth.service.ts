import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
// import {Subject} from 'rxjs';
import { AuthData } from '../../classes/AuthData';
import { baseURL } from '../../baseurl' ;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private user : any ;
  private tokenTimer: any;
  // private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  setToken( token : string){
    this.token = token ;
  }

  getUser() {
    return this.user ;
  }

  setUser(user : any){
    this.user = user ;
  }

  setIsAuthenticated(res : boolean){
    this.isAuthenticated = res ;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  // getAuthStatusListener() {
  //   return this.authStatusListener.asObservable();
  // }

 login(username: string, password: string)  {
    const authData: AuthData = { username: username, password: password };
    return this.http.post<{ jwt: any , user : any }>(baseURL + "auth-service/login", authData)
  }

  // postUsers(users : User[]): Observable<any> {
  //       return this.http.post<any>("http://localhost:8083/addusers" , users);
  // }


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    // this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
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
      this.setAuthTimer(expiresIn / 1000);
      // this.authStatusListener.next(true);
    }
  }


   setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

   saveAuthData(token: string, expirationDate: Date , user :any) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("id" , user.id);
    localStorage.setItem("role" , user.authorities[0].authority);
  }

   clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("id");
    localStorage.removeItem("role")
  }

  getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const id  = localStorage.getItem("id");
    const role =  localStorage.getItem("role");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      id : id  ,
      role : role
    }
  }


}
