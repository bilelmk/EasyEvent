import { Component , OnInit} from '@angular/core';
import * as L from 'leaflet';
import { LoadingController } from "@ionic/angular";
import { Storage } from '@ionic/Storage';
import { Invitation } from "../../shared/classes/Invitation";
import 'leaflet-routing-machine';
import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements OnInit {

  invitation: Invitation = new Invitation;
  event_coordinate ;
  map ;

  constructor(private loadingController: LoadingController, private storage: Storage , private geolocation: Geolocation) {
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
          this.storage.get('acceptedInvitation').then(
              res => {
                this.invitation = res;
                this.event_coordinate = res.event.coordinate;
                this.createMap(this.event_coordinate) ;
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

  drawRoute(){
      this.loadingController.create({message: "Loading . . . "}).then(
          loading => {
              loading.present();

              this.geolocation.getCurrentPosition().then((resp) => {
                  L.Routing.control({
                      showAlternatives: false,
                      waypoints: [
                          L.latLng(this.event_coordinate.latitude, this.event_coordinate.longitude),
                          L.latLng(resp.coords.latitude , resp.coords.longitude)
                      ]
                  }).addTo(this.map);
                  loading.dismiss();
              }).catch((error) => {
                  loading.dismiss();
                  console.log('Error getting location', error);
              });

          }).catch(err => {
          console.log(err)
      })

  }



}

