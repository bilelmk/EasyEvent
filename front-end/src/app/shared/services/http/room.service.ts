import { Injectable } from '@angular/core';
import { Room } from '../../classes/Room';
import { baseURL } from '../../baseurl';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http : HttpClient ) { }

  getRooms(event_id : number) : Observable<Room[]> {
    return this.http.get<Room[]>(baseURL + "event-service/rooms/" + event_id)
  }

  updateRoom(room :any ): Observable<Room> {
    return this.http.put<Room>(baseURL + "event-service/rooms" , room )
  }

  deleteRoom(id : number): Observable<any> {
    return this.http.delete<any>(baseURL + "event-service/rooms/" + id  )
  }

}
