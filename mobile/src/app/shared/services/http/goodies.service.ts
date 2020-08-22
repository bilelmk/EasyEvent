import { Injectable } from '@angular/core';
import { baseURL } from '../../baseurl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goody } from '../../classes/Goody';

@Injectable({
  providedIn: 'root'
})
export class GoodiesService {

  constructor(private http : HttpClient) { }

  getUserGoodies(event_id , user_id) : Observable<Goody[]> {
    return this.http.get<Goody[]>(baseURL + "event-service/goodies/user/" + event_id + '/' + user_id )
  }

  updateExistResponse(response :any ): Observable<any> {
    return this.http.put<any>(baseURL + "event-service/goodies/response", response )
  }

  addResponse(response : any , id : number): Observable<any> {
    return this.http.post<any>(baseURL + "event-service/goodies/response/" + id , response )
  }

}
