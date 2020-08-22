import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubSession} from '../../classes/SubSession';
import { baseURL } from '../../baseurl';

@Injectable({
  providedIn: 'root'
})
export class SubsessionService {

  constructor(private http: HttpClient) {}

  putSubSession(subSession: SubSession) {
    return this.http.put(baseURL + "event-service/subsessions", subSession);
  }

  deleteSubSession(id: number) {
    return this.http.delete(baseURL + "event-service/subsessions/" + id);
  }
}
