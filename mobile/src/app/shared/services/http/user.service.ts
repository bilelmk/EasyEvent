import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { User } from '../../classes/User';
import { baseURL } from '../../baseurl';
import { ConnectionStatus, NetworkService } from '../local/network.service';
import { map, tap } from 'rxjs/operators';
import { Storage } from '@ionic/Storage';
import { OfflineService } from '../local/offline.service';

const API_STORAGE_KEY = 'specialkey';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient , private networkService: NetworkService, private storage: Storage, private offlineManager: OfflineService) { }

    setImage(id:number,image: FormData): Observable<User> {
        return this.http.put<User>(baseURL + "user-service/users/image/" + id , image);
    }

    getUser(id:number): Observable<User> {
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
            return from(this.getLocalData('user'));
        }
        else {
            // Return real API data and store it locally
            return this.http.get<User>(baseURL + "user-service/users/" + id ).pipe(
                tap(res => {
                    this.setLocalData('user', res);
                })
            )
        }
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
