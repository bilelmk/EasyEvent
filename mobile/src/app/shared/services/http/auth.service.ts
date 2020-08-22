import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from '../../classes/AuthData';
import { Storage } from '@ionic/Storage';
import { baseURL } from '../../baseurl'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private isAuthenticated = false;
    private token: string;
    private user : any ;
    private tokenTimer: any;
    private isAdmin : boolean = false;
    // private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient , private router: Router , private storage: Storage) {}

    getToken() {
        return this.token;
    }

    getIsAdmin(){
        return this.isAdmin ;
    }

    setIsAdmin( admin : boolean){
        this.isAdmin = admin ;
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
        return this.http.post<{ jwt: any , user : any }>(baseURL+ "auth-service/login", authData)
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        // this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }


    async autoAuthUser() {
        const authInformation = await this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.router.navigate(['/home']);
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
        }
    }


    setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    saveAuthData(token: string, expirationDate: Date , user :any) {
        this.storage.set('authData', {
            "token": token ,
            "expiration" : expirationDate.toISOString() ,
            "id" : user.user_id ,
            "role" : user.authorities[0].authority
            });
    }

    clearAuthData() {
        this.storage.clear() ;
    }

    getAuthData() : any {
        return this.storage.get('authData').then((val) => {
            const token = val.token;
            const expirationDate = val.expiration;
            const id  = val.id;
            const role =  val.role;
            if (!token || !expirationDate) {
                return  ;
            }
            return {
                token: token,
                expirationDate: new Date(expirationDate),
                id : id  ,
                role : role
            }
        }).catch( err => {
            return  ;
        });
    }

}
