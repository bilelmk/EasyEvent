import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { Invitation } from '../../../shared/classes/Invitation';
import { InvitationsService } from '../../../shared/services/http/invitations.service';
import { Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-invitation-home',
  templateUrl: './invitation-home.page.html',
  styleUrls: ['./invitation-home.page.scss'],
})
export class InvitationHomePage implements OnInit {

  invitation : Invitation = new Invitation;

  constructor(private loadingController : LoadingController , private storage : Storage ,
              private invitationService : InvitationsService , private sanitizer: DomSanitizer ,

                private router : Router) { }

  ngOnInit() {
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present() ;
          this.storage.get('invitation').then(
              res => {
                this.invitation = res ;
                // console.log(res.event.image.data)
                loading.dismiss() ;
              }
          ).catch(err => {
            console.log(err) ;
            loading.dismiss() ;
          });
        }).catch(err => {
          console.log(err)
        }
    )
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

    getImage(image: any) {
        if(image){
            let imageSrc=this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + image.data);
            return imageSrc
        }else {
            return '../../assets/image/madison.jpg';

        }
    }

}
