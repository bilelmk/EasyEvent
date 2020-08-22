import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Invitation } from '../../classes/Invitation';
import { baseURL } from '../../baseurl';
import {Session} from '../../classes/Session';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http : HttpClient) { }


  getInvitationsByEvent(id : number ) : Observable<Invitation[]> {
    return this.http.get<Invitation[]>(baseURL + "event-service/invitations/event/" + id)
  }

  getAcceptedInvitations(id : number ) : Observable<Invitation[]> {
    return this.http.get<Invitation[]>(baseURL + "event-service/invitations/event/accepted/" + id)
  }

  putInvitations(invitations: Invitation[]) {
    return this.http.put(baseURL + "event-service/invitations", invitations);
  }

  // postEvent(invitation : Invitation): Observable<Invitation> {
  //   return this.http.post<Invitation>(baseURL + "event-service/invitations", invitation);
  // }

}
