import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../../baseurl';
import { Observable } from 'rxjs';
import { Goody } from '../../classes/Goody';

@Injectable({
  providedIn: 'root'
})
export class GoodyService {

  constructor(private http: HttpClient) { }

  getGoodiesByEventId(id : number): Observable<Goody[]> {
    return this.http.get<Goody[]>(baseURL + "event-service/goodies/event/" +id );
  }

  getGoodyResult(id : number): Observable<number> {
    return this.http.get<number>(baseURL + "event-service/goodies/result/" +id );
  }



  postGoody(goody : Goody): Observable<Goody> {
    return this.http.post<Goody>(baseURL + "event-service/goodies" , goody);
  }

  putGoody(goody : Goody) {
    return this.http.put(baseURL + "event-service/goodies" , goody);
  }

  deleteGoody(id: number) {
    return this.http.delete(baseURL + "event-service/goodies/" + id);
  }

  deleteGoodyFeature(id: number) {
    return this.http.delete(baseURL + "event-service/goodies/feature/" + id);
  }

  deleteGoodyOption(id: number) {
    return this.http.delete(baseURL + "event-service/goodies/option/" + id);
  }
}
