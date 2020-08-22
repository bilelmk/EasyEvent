import {Component, OnInit} from '@angular/core';
import {Config, LoadingController} from '@ionic/angular';
import {Storage} from '@ionic/Storage';
import {Event} from '../../../shared/classes/Event';
import {EventDay} from '../../../shared/classes/EventDay';
import {Invitation} from '../../../shared/classes/Invitation';
import {Router} from '@angular/router';
import {InvitationsService} from '../../../shared/services/http/invitations.service';

@Component({
  selector: 'app-invitation-calendar',
  templateUrl: './invitation-calendar.page.html',
  styleUrls: ['./invitation-calendar.page.scss'],
})
export class InvitationCalendarPage implements OnInit {

  invitation : Invitation = new Invitation ;
  selectedDay : any ;
  days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  ios: boolean;
  showSearchbar: boolean;

  constructor(private loadingController : LoadingController , private storage : Storage , private config : Config  ,
              private invitationService : InvitationsService , private router : Router ) { }

  ngOnInit() {
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present() ;
          this.ios = this.config.get('mode') === 'ios';
          this.storage.get('invitation').then(
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

    acceptInvitation(){
        this.loadingController.create({message: "Saving . . . "}).then(
            loading => {
                loading.present() ;
                this.invitationService.acceptInvitation(this.invitation.invitation_id).subscribe(
                    res => {
                        this.router.navigate(["/home/events"])
                        loading.dismiss() ;
                    },
                    err => {
                        loading.dismiss() ;
                        console.log(err)
                    }
                )
            }).catch(err => {
                console.log(err)
            }
        )
    }
}
