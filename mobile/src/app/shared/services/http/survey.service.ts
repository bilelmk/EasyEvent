import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Survey } from '../../classes/Survey';
import { baseURL } from '../../baseurl'
import { ConnectionStatus, NetworkService } from '../local/network.service';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/Storage';
import { OfflineService } from '../local/offline.service';

const API_STORAGE_KEY = 'specialkey';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient , private networkService : NetworkService , private storage: Storage  ,
                private offlineService : OfflineService ) { }

    getUserSurveys(event_id : number , user_id : number ): Observable<Survey[]> {
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
            return from(this.getLocalData('survey'+ "e" + event_id + "u" + user_id));
        }
        else {
            // Return real API data and store it locally
            return this.http.get<Survey[]>(baseURL + "event-service/surveys/user/" + event_id + '/' + user_id ).pipe(
                tap(res => {
                    this.setLocalData('survey'+ "e" + event_id + "u" + user_id, res);
                })
            )
        }
  }

    updateExistResponse(response :any ): Observable<any> {
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
            return from(this.offlineService.storeRequest(baseURL + "event-service/surveys/response", 'PUT' , response));
        } else {
            return this.http.put<any>(baseURL + "event-service/surveys/response" , response );
        }
    }

    addResponse(response : any , id : number): Observable<any> {
        if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
            return from(this.offlineService.storeRequest(baseURL + "event-service/surveys/response/" + id, 'POST', response));
        } else {
            return this.http.post<any>(baseURL + "event-service/surveys/response/" + id , response );
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
