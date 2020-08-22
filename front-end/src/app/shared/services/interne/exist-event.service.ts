import { Injectable } from '@angular/core';
import { Event } from '../../classes/Event';

@Injectable({
  providedIn: 'root'
})
export class ExistEventService {

  private  existEvent : Event ;

  constructor() { }

  setExistEvent(existEvent : Event){
    this.existEvent = existEvent ;
  }

  getExistEvent() : Event{
    return this.existEvent ;
  }

  // updateEvent(updatedEvent : Event) {
  //   this.existEvent.name = updatedEvent.name ;
  //   this.existEvent.description = updatedEvent.description ;
  //   this.existEvent.start_date = updatedEvent.start_date ;
  //   this.existEvent.end_date = updatedEvent.end_date;
  //
  // }
}
