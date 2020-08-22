import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { EventDay } from '../../shared/classes/EventDay';
import { EventService } from '../../shared/services/http/event.service';
import { MatDialog } from '@angular/material';
import { CreateEventPlanSessionComponent } from './create-event-plan-session/create-event-plan-session.component';
import { CreateEventPlanSubsessionComponent } from './create-event-plan-subsession/create-event-plan-subsession.component';
import { NotificationService } from '../../shared/services/interne/notification.service';
import { CreateEventService } from '../../shared/services/interne/create-event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event-plan',
  templateUrl: './create-event-plan.component.html',
  styleUrls: ['./create-event-plan.component.scss']
})
export class CreateEventPlanComponent implements OnInit {

  @ViewChildren("time") time: QueryList<NgModel>;

  days : EventDay[] = [];
  months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  week_days = [ "Sun" , "Mon" , "Tue" , "Wed" , "Thu" , "Fri" , "Sat" ];
  selected_eventDay = null ;
  selected_day = null ;

  constructor(private eventService : EventService , public dialog: MatDialog ,private notificationService : NotificationService ,
              private createEventService : CreateEventService , private router: Router) { }

  ngOnInit() {
    this.getDays() ;
    this.selected_day = this.days[0] ? this.days[0].day : null ;
    this.selected_eventDay = this.days[0]  ? this.days[0] : null ;
  }

  getDays(){
    if(this.createEventService.getMyEvent()){
      let lastDay = this.createEventService.getMyEvent().end_date ;
      var firstDay = new Date(this.createEventService.getMyEvent().start_date.getTime() );
      while(firstDay <= lastDay){
        const eventDay = new EventDay ;
        eventDay.day = new Date(firstDay.getTime()) ;
        this.days.push(eventDay) ;
        firstDay.setDate(firstDay.getDate() +1)
      }
    }
  }

  openAddSessionDialog() : void {
    const dialogRef = this.dialog.open(CreateEventPlanSessionComponent, {
      panelClass: 'custom-dialog-container' , width: '800px' , height : '600px' , data: this.selected_eventDay
    });
  }


  openAddSubSessionDialog(session) {
    const dialogRef = this.dialog.open(CreateEventPlanSubsessionComponent, {
      panelClass: 'custom-dialog-container' , width: '800px' , height : '600px' , data: session
    });
  }

  // Extract month day ... from date type
  getDayDetails(day: Date) {
    return {
      week_day : this.week_days[day.getDay()] ,
      month : this.months[day.getMonth()] ,
      day : day.getDate()
    }
  }

  // select one event day
  selectDay(day){
    this.selected_eventDay = day ;
    this.selected_day = day.day ;
  }


  // Submit data to add event
  addEvent() {
    let event = this.createEventService.getMyEvent() ;
    event.day_list = this.days ;

    this.eventService.postEvent(event).subscribe(
      res => {
        this.eventService.insertImage(res.event_id , this.eventService.image).subscribe(
          resp => {
            this.notificationService.openSnackBar('Event added successfully' , 'green-snackbar') ;
            this.createEventService.initEvent() ;
            this.router.navigate(['/main/events']);
          }  ,
          err => {
            this.notificationService.openSnackBar('Error when adding event image' , 'red-snackbar')
          }
        );
      } ,
      err => {
        this.notificationService.openSnackBar('Error when adding event' , 'red-snackbar')
      }
    )
  }

}
