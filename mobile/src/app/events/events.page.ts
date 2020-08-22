import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { Invitation } from '../shared/classes/Invitation';
import { InvitationsService } from '../shared/services/http/invitations.service';
import { AuthService } from '../shared/services/http/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { ToastService } from '../shared/services/local/toast.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage {

  invitations : Invitation[] = null ;
  months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  week_days = [ "Sun" , "Mon" , "Tue" , "Wed" , "Thu" , "Fri" , "Sat" ];


  constructor(private invitationsService : InvitationsService , private loadingController : LoadingController ,
              private authService : AuthService , private router : Router , private storage : Storage ,
              private sanitizer: DomSanitizer , private toastService : ToastService) { }

  ionViewWillEnter() {
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present() ;
          this.authService.getAuthData().then(
              res => {
                this.invitationsService.getAcceptedInvitations(res.id).subscribe(
                    res => {
                      this.invitations = res ;
                      loading.dismiss() ;
                    },
                    err => {
                      console.log(err)
                      loading.dismiss() ;
                    }
                )}
          ).catch(err => {
            console.log(err)
            loading.dismiss() ;
          });
        }).catch(err => {
          console.log(err)
        }
    )
  }


// Extract month day ... from date type
  getDayDetails(d: Date) {
    let day =  new Date(d) ;
    return {
        week_day : this.week_days[day.getDay()] ,
        month : this.months[day.getMonth()] ,
        day : day.getDate()
    }
  }


  // doRefresh(event) {
  //   console.log('Begin async operation');
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     event.target.complete();
  //   }, 2000);
  // }


    resolve(){
      if(this.invitations == null ){
          return null;
      }
      else if(this.invitations.length == 0 ){
          return 'noevent' ;
      }
      return 'event'
    }


    getDetails(invitation: Invitation) {
        this.loadingController.create({message: "Loading . . . "}).then(
            loading => {
                loading.present() ;
                this.storage.set('acceptedInvitation' , invitation ).then(
                    res => {
                        this.router.navigate(["/home/events/event"])
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


    getImage(image: any) {
      if(image){
          let imageSrc=this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + image.data);
          return imageSrc
      }else {
          return '../../assets/image/madison.jpg';

      }
    }

}
