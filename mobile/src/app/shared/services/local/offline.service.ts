import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of, forkJoin } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { Storage } from '@ionic/Storage';

const STORAGE_REQ_KEY = 'storedreq';

interface StoredRequest {
  url: string,
  type: string,
  data: any,
  time: number,
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class OfflineService {

  constructor(private storage: Storage, private http : HttpClient, private toastService: ToastService) { }

  checkForEvents(): Observable<any> {
    return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
        switchMap(storedOperations => {
          let storedObj = JSON.parse(storedOperations);
          if (storedObj && storedObj.length > 0) {
            return this.sendRequests(storedObj).pipe(
                finalize(() => {
                  this.toastService.presentToast(`Local data succesfully synced to server` , "success-toast") ;
                  this.storage.remove(STORAGE_REQ_KEY);
                })
            );
          } else {
            console.log('no local events to sync');
            return of(false);
          }
        })
    )
  }

  storeRequest(url, type, data) {
    this.toastService.presentToast(`Your data is stored locally because you seem to be offline.` , "success-toast") ;
    let action: StoredRequest = {
      url: url,
      type: type,
      data: data,
      time: new Date().getTime(),
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    };

    return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
      let storedObj = JSON.parse(storedOperations);

      if (storedObj) {
        storedObj.push(action);
      } else {
        storedObj = [action];
      }
      // Save old & new local transactions back to Storage
      return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
    });
  }

  sendRequests(operations: StoredRequest[]) {
    let obs = [];

    for (let op of operations) {
      console.log('Make one request: ', op);
      let oneObs = this.http.request(op.type, op.url,{body : op.data} );
      obs.push(oneObs);
    }

    // Send out all local events and return once they are finished
    return forkJoin(obs);
  }
}
