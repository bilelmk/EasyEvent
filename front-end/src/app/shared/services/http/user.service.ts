import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../classes/User';
import { baseURL } from '../../baseurl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(baseURL + "user-service/users");
    }

    // getThinUsers() : Observable<User[]> {
    //   return this.http.get<User[]>(baseURL + "user-service/users/thin");
    // }

    searchUsers(id : number , page : number , size : number , filter : string ) : Observable<User[]> {
      return this.http.get<User[]>(baseURL + "user-service/users/search/" + id + "?page=" + page + "&size=" + size + "&filter=" + filter );
    }

    postUsers(users : User[]): Observable<User[]> {
        return this.http.post<User[]>(baseURL + "user-service/users/addusers" , users);
    }

    postUser(user : User): Observable<User> {
        return this.http.post<User>(baseURL + "user-service/users/adduser" , user);
    }

    deleteUsers(id: number) {
        return this.http.delete(baseURL + "user-service/users/" + id);
    }
}
