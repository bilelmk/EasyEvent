import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/Storage';
import {InvitationsService} from '../../../shared/services/http/invitations.service';
import {Invitation} from '../../../shared/classes/Invitation';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {

  constructor(private modalCtrl : ModalController , private barcodeScanner: BarcodeScanner , private loadingController : LoadingController
            , private storage: Storage , private invitationService : InvitationsService) { }

  invitations : Invitation[] = [] ;
  group : string = null;

  ngOnInit() {
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present();
          this.storage.get('acceptedInvitation').then(
              res => {
                this.invitationService.getEventAcceptedInvitations(res.event.event_id).subscribe(
                    invitations => {
                      this.invitations = invitations ;
                      loading.dismiss();
                    }, error => {
                      loading.dismiss();
                      console.log(error)
                    }
                );}
          ).catch(err => {
            console.log(err);
            loading.dismiss();
          });
        }).catch(err => {
          console.log(err)
        }
    )
  }

  dismiss() {
    this.modalCtrl.dismiss()
        .then((res) => {
            this.loadingController.create({message: "Loading . . . "}).then(
                loading => {
                    loading.present();
                    this.invitationService.putInvitations(this.invitations).subscribe(
                        res => {
                            loading.dismiss();
                            console.log(res)
                        } ,
                        err => {
                            loading.dismiss();
                            console.log(err)
                        }
                    )
                }).catch(err => {console.log(err)}
            )
        })
        .catch((err) => {
            console.log(err)
        });
  }

  Scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.invitations.map( inv => {
        if(barcodeData.text == inv.user.user_id+inv.user.username){
            inv.grp = this.group ;
            inv.status = "arrived" ;
        }
      })
    }).catch(err => {
      console.log('Error', err);
    });
  }


}
