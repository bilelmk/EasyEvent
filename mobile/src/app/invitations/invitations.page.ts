import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { InvitationsService } from '../shared/services/http/invitations.service';
import { Invitation } from '../shared/classes/Invitation';
import { AuthService } from '../shared/services/http/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.page.html',
  styleUrls: ['./invitations.page.scss'],
})

export class InvitationsPage  {

  invitations : Invitation[] = null ;

  constructor(private invitationsService : InvitationsService , private loadingController : LoadingController ,
              private authService : AuthService , private router : Router , private storage : Storage ,
              private sanitizer: DomSanitizer) { }


  ionViewWillEnter() {
      this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present() ;
          this.authService.getAuthData().then(
              res => {
                this.invitationsService.getInvitations(res.id).subscribe(
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

    doRefresh(event) {
        console.log('Begin async operation');
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

    resolve(){
      console.log(this.invitations) ;
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
                this.storage.set('invitation' , invitation ).then(
                    res => {
                        this.router.navigate(["/home/invitations/invitation"])
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
