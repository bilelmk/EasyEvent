import { Component, OnInit } from '@angular/core';
import { Config, LoadingController } from '@ionic/angular';
import { Invitation } from "../../shared/classes/Invitation";
import { Storage } from "@ionic/Storage";
import { EventDay } from "../../shared/classes/EventDay";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  invitation : Invitation = new Invitation ;
  selectedDay : any ;
  days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  ios: boolean;
  showSearchbar: boolean;

  constructor(private loadingController : LoadingController , private storage : Storage , private config : Config  ) { }

  ngOnInit() {
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present() ;
          this.ios = this.config.get('mode') === 'ios';
          this.storage.get('acceptedInvitation').then(
              res => {
                this.invitation = res ;
                this.selectedDay=this.invitation.event.day_list[0].day_id
                loading.dismiss() ;
              }
          ).catch(err => {
            console.log(err)
            loading.dismiss() ;
          });
        }).catch(err => {
          console.log(err)
        }
    )
  }


  selectDay(day_id: number) {
    this.selectedDay = day_id
  }

  getDayName(eventDay: EventDay) {
    let day = new Date(eventDay.day).getDay();
    return this.days[day]
  }

  getDayNumber(eventDay: EventDay) {
    return new Date(eventDay.day).getDate()
  }


}
