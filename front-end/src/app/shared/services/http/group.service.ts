import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../../classes/Group';
import { baseURL } from '../../baseurl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  // Server calls
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(baseURL + "event-service/groups");
  }

  postGroup(grp : Group): Observable<Group> {
    return this.http.post<Group>(baseURL + "event-service/groups", grp);
  }


  deleteGroup(id: number) {
    return this.http.delete(baseURL + "event-service/groups/" + id);
  }

  putGroup(grp: Event) {
    return this.http.put(baseURL + "event-service/groups", grp);
  }

}
