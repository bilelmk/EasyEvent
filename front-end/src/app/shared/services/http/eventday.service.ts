import { Injectable } from '@angular/core';
import { Session } from '../../classes/Session';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../../baseurl';

@Injectable({
  providedIn: 'root'
})
export class EventdayService {

  constructor(private http: HttpClient) {}

  addSessionToEventDay(id : number , session : Session) {
    return this.http.post(baseURL + "event-service/eventDays/"+id , session)
  }

}
