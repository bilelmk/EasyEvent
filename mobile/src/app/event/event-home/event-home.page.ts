import { Component, OnInit } from '@angular/core';
import { Invitation } from '../../shared/classes/Invitation';
import { LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { InvitationsService } from '../../shared/services/http/invitations.service';
import { Router } from '@angular/router';
import { SurveysPage } from './surveys/surveys.page';
import { GoodiesPage } from './goodies/goodies.page';
import { RoomsPage } from './rooms/rooms.page';
import { VotesPage } from './votes/votes.page';
import { StatisticsPage } from './statistics/statistics.page';
import { QrScannerPage } from './qr-scanner/qr-scanner.page';
import { AuthService } from "../../shared/services/http/auth.service";

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.page.html',
  styleUrls: ['./event-home.page.scss'],
})
export class EventHomePage implements OnInit {

  invitation: Invitation = new Invitation;
  isAdmin = false ;

  constructor(private loadingController: LoadingController, private storage: Storage, private invitationService: InvitationsService,
              private router: Router , private modalCtrl : ModalController , private authService : AuthService) {
  }

  ngOnInit() {
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present();
          this.storage.get('acceptedInvitation').then(
              res => {
                this.isAdmin = this.authService.getIsAdmin() ;
                this.invitation = res;
                loading.dismiss();
              }
          ).catch(err => {
            console.log(err);
            loading.dismiss();
          });
        }).catch(err => {
          console.log(err)
        }
    )
  }

    async presentShirtsModal() {
        const modal = await this.modalCtrl.create({
            component: GoodiesPage
        });
        return await modal.present();
    }

    async presentRoomsModal() {
        const modal = await this.modalCtrl.create({
            component: RoomsPage
        });
        return await modal.present();
    }

    async presentPollsModal() {
        const modal = await this.modalCtrl.create({
            component: VotesPage
        });
        return await modal.present();
    }

    async presentSurveysModal() {
        const modal = await this.modalCtrl.create({
            component: SurveysPage
        });
        return await modal.present();
    }


    async presentStatModal() {
        const modal = await this.modalCtrl.create({
            component: StatisticsPage
        });
        return await modal.present();
    }

    async presentQRModal() {
        const modal = await this.modalCtrl.create({
            component: QrScannerPage
        });
        return await modal.present();
    }
}
