import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ExistEventService } from '../../../shared/services/interne/exist-event.service';
import { EventDay} from '../../../shared/classes/EventDay';
import { Session} from '../../../shared/classes/Session';
import { Event} from '../../../shared/classes/Event';
import { SubSession} from '../../../shared/classes/SubSession';
import { EventPlanAddSubsessionComponent } from './event-plan-add-subsession/event-plan-add-subsession.component';
import { EventPlanDeleteSessionComponent } from './event-plan-delete-session/event-plan-delete-session.component';
import { EventPlanEditSessionComponent } from './event-plan-edit-session/event-plan-edit-session.component';
import { EventPlanAddSessionComponent } from './event-plan-add-session/event-plan-add-session.component';
import { EventPlanEditSubsessionComponent } from './event-plan-edit-subsession/event-plan-edit-subsession.component';
import { EventPlanDeleteSubsessionComponent } from './event-plan-delete-subsession/event-plan-delete-subsession.component';

@Component({
  selector: 'app-event-plan',
  templateUrl: './event-plan.component.html',
  styleUrls: ['./event-plan.component.scss']
})
export class EventPlanComponent implements OnInit {

  existEvent : Event ;
  months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  week_days = [ "Sun" , "Mon" , "Tue" , "Wed" , "Thu" , "Fri" , "Sat" ];
  selected_eventDay = null ;
  selected_day = null ;

  constructor(private existEventService : ExistEventService , public dialog: MatDialog ) { }

  ngOnInit() {
    this.existEvent = this.existEventService.getExistEvent() ;
    this.selected_day = this.existEvent.day_list[0] ? this.existEvent.day_list[0].day : null ;
    this.selected_eventDay = this.existEvent.day_list[0]  ? this.existEvent.day_list[0] : null ;
  }

  // Extract month day ... from date type
  getDayDetails(d: Date) {
    let day =  new Date(d)
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

  openAddSessionDialog(day: EventDay) {
    const dialogRef = this.dialog.open(EventPlanAddSessionComponent, {
      panelClass: 'custom-dialog-container' , width: '800px' , height : '600px' , data : day
    });
  }

  openEditSessionDialog(session: Session) : void {
    const dialogRef = this.dialog.open(EventPlanEditSessionComponent, {
      panelClass: 'custom-dialog-container' , width: '800px' , height : '600px' , data :session
    });
  }

  openDeleteSessionDialog(id : number , day : EventDay) {
    const dialogRef = this.dialog.open(EventPlanDeleteSessionComponent, {
      panelClass: 'custom-dialog-container' , width: '800px' , height : '400px' , data : { 'id': id , 'day' : day}
    });
  }

  openAddSubSessionDialog(session: Session) {
    const dialogRef = this.dialog.open(EventPlanAddSubsessionComponent, {
      panelClass: 'custom-dialog-container' , width: '800px' , height : '600px' , data : session
    });
  }

  openEditSubSessionDialog(sub: SubSession) {
    const dialogRef = this.dialog.open(EventPlanEditSubsessionComponent, {
      panelClass: 'custom-dialog-container' , width: '800px' , height : '600px' , data : sub
    });
  }

  openDeleteSubSessionDialog(id : number , session : Session) {
    const dialogRef = this.dialog.open(EventPlanDeleteSubsessionComponent, {
      panelClass: 'custom-dialog-container' , width: '800px' , height : '400px' , data : { 'id': id , 'session' : session}
    });
  }

}
