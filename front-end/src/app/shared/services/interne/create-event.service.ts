import { Injectable } from '@angular/core';
import { Event } from '../../classes/Event';
import {EventDay} from '../../classes/EventDay';

@Injectable({
  providedIn: 'root'
})

export class CreateEventService {

  private  event : Event ;

  addDescription(event : Event){
    this.event = event ;
  }



  initEvent(){
    this.event = null ;
  }

  addDays(days : EventDay[]){
    this.event.day_list = days
  }

  getMyEvent(){
    return this.event
  }

  setMyEvent(event : Event) {
    this.event = event
  }

}
