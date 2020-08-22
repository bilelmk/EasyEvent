import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDay } from '../../classes/EventDay';
import { Event } from '../../classes/Event'
import { baseURL } from '../../baseurl';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  image  ;

  constructor(private http: HttpClient) {
  }


  // Server calls
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(baseURL + "event-service/events");
  }

  getEvent(id : number): Observable<Event> {
    return this.http.get<Event>(baseURL + "event-service/events/"+id);
  }

  postEvent(event : Event): Observable<Event> {
    return this.http.post<Event>(baseURL + "event-service/events", event);
  }

  insertImage(id : number , image : any): Observable<Event> {
    return this.http.put<Event>(baseURL + "event-service/events/image/" + id , image);
  }

  DeleteEvent(id: number) {
    return this.http.delete(baseURL + "event-service/events/" + id);
  }

  putEvent(event: Event) {
    return this.http.put(baseURL + "event-service/events", event);
  }
}
