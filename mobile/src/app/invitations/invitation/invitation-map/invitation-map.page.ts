import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LoadingController } from "@ionic/angular";
import { Storage } from '@ionic/Storage';
import {Invitation} from "../../../shared/classes/Invitation";
import {InvitationsService} from '../../../shared/services/http/invitations.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-invitation-map',
  templateUrl: './invitation-map.page.html',
  styleUrls: ['./invitation-map.page.scss'],
})
export class InvitationMapPage implements OnInit {

  invitation: Invitation = new Invitation;
  map ;

  constructor(private loadingController: LoadingController, private storage: Storage ,
              private invitationService : InvitationsService , private router : Router    ) {
  }


  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  ngOnInit() {
    this.loadingController.create({message: "Loading . . . "}).then(
        loading => {
          loading.present();
          this.storage.get('invitation').then(
              res => {
                this.invitation = res;
                this.createMap(res.event.coordinate) ;
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

  createMap(coordinate) {
    const zoomLevel = 10;
    this.map = L.map('map', {
      center: [coordinate.latitude, coordinate.longitude],
      zoom: zoomLevel
    });
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          minZoom: 0,
          maxZoom: 20,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    );
    mainLayer.addTo(this.map);

    let marker = L.marker([coordinate.latitude, coordinate.longitude], { icon: this.smallIcon });
    marker.addTo(this.map)
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
