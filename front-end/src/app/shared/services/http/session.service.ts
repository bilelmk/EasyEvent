import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Session } from '../../classes/Session';
import { SubSession } from '../../classes/SubSession';
import { baseURL } from '../../baseurl';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) {}

  putSession(session: Session) {
    return this.http.put(baseURL + "event-service/sessions", session);
  }

  deleteSession(id: number) {
    return this.http.delete(baseURL + "event-service/sessions/" + id);
  }

  addSubSessionToSession(id : number , subSession : SubSession) {
    return this.http.post(baseURL + "event-service/sessions/" + id , subSession)
  }

}
