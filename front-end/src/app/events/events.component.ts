import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/services/http/event.service';
import { Router } from '@angular/router';
import { ExistEventService } from '../shared/services/interne/exist-event.service';
import { Event } from '../shared/classes/Event' ;
import { EventDay } from '../shared/classes/EventDay';
import { DomSanitizer } from '@angular/platform-browser';
import { SpinnerService } from '../shared/services/interne/spinner.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Event[] = [] ;
  months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

  constructor(private eventService : EventService, private router : Router , private existEventService : ExistEventService ,
              private spinnerService: SpinnerService ,  private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.spinnerService.activate();
    this.eventService.getEvents().subscribe(
      res => {
        this.events = res ;
        this.spinnerService.deactivate()
      },
      err => {
        console.log(err)
        this.spinnerService.deactivate()
      }
    )
  }


  navigateToEvent(event : Event) {
    this.existEventService.setExistEvent(event);
    this.router.navigate(['/main/events/event']) ;
  }

  getMonth(date: Date) {
    return this.months[new Date(date).getMonth()].toUpperCase()
  }

  getDay(date: Date) {
    return new Date(date).getDate()
  }

  getEndTime(day_list: EventDay[]) {
    if (day_list == []){
      return "--"
    }
    else {
      return day_list[day_list.length-1].end_activity + " H"
    }
  }

  getStartTime(day_list: EventDay[]) {
    if (day_list == []){
      return "--"
    }
    else {
      return day_list[0].start_activity + " H"
    }
  }

  getImage(image: any){
    if(!image) {
      return {
        "background-image": "linear-gradient(to right bottom, rgba(63,114,175,0.31), rgba(63,114,175,0.31)), url(../../assets/img/talan.png)"
      }
    }
    else{
      let img = 'data:image/jpeg;base64,' + image.data;
      return  {
        "background-image": `linear-gradient(to right bottom, rgba(63,114,175,0.91), rgba(63,114,175,0.91)), url( "${img}")`
      }
    }
  }
}
