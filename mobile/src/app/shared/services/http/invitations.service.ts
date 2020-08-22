import { Injectable } from '@angular/core';
import { baseURL } from '../../baseurl';
import { HttpClient }  from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Invitation } from '../../classes/Invitation';
import { ConnectionStatus, NetworkService } from '../local/network.service';
import { map, tap } from 'rxjs/operators';
import { Storage } from '@ionic/Storage';
import { OfflineService } from '../local/offline.service';

const API_STORAGE_KEY = 'specialkey';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {

  constructor(private http: HttpClient , private networkService: NetworkService, private storage: Storage, private offlineManager: OfflineService) { }


  getInvitations(id : number) : Observable<Invitation[]>{
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.getLocalData('invtations'));
    }
    else {
      // Return real API data and store it locally
      return this.http.get<Invitation[]>(baseURL + "event-service/invitations/user/" + id ).pipe(
          tap(res => {
            this.setLocalData('invtations', res);
          })
      )
    }
  }

  getAcceptedInvitations(id : number) : Observable<Invitation[]>{
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      return from(this.getLocalData('events'));
    }
    else {
      // Return real API data and store it locally
      return this.http.get<Invitation[]>(baseURL + "event-service/invitations/user/accepted/" + id).pipe(
          tap(res => {
            this.setLocalData('events', res);
          })
      )
    }
  }

  getEventAcceptedInvitations(id : number ) : Observable<Invitation[]> {
    return this.http.get<Invitation[]>(baseURL + "event-service/invitations/event/accepted/" + id)
  }

  acceptInvitation(id : number) : Observable<Invitation>{
    return this.http.put<Invitation>(baseURL + "event-service/invitations/user/" + id ,null);
  }

  putInvitations(invitations: Invitation[]) {
    return this.http.put(baseURL + "event-service/invitations", invitations);
  }



  // Save result of API requests
  private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }

  // Get cached API result
  private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }


}
