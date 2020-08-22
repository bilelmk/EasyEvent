import { Component , OnInit } from '@angular/core';
import { Event } from '../../../shared/classes/Event';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import {Coordinate} from '../../../shared/classes/Coordinate';
import {EventService} from '../../../shared/services/http/event.service';
import {ExistEventService} from '../../../shared/services/interne/exist-event.service';
import {NotificationService} from '../../../shared/services/interne/notification.service';
import {SpinnerService} from '../../../shared/services/interne/spinner.service';

@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss']
})
export class EventDescriptionComponent implements OnInit {

  existEvent: Event;
  descriptionForm: FormGroup;

  // Map variables
  map ;
  marker ;
  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });


  constructor(private eventService: EventService , private existEventService : ExistEventService ,
              private notificationService : NotificationService , private spinnerService : SpinnerService) {}

  ngOnInit() {
    this.existEvent = this.existEventService.getExistEvent();
    this.existEvent.start_date = new Date(this.existEvent.start_date);
    this.existEvent.end_date = new Date(this.existEvent.end_date);

    // init description form
    this.descriptionForm = new FormGroup({
      'name': new FormControl(this.existEvent.name, Validators.required),
      'description': new FormControl(this.existEvent.description, Validators.required),
      'end_date': new FormControl({value: this.existEvent.end_date, disabled: true} , Validators.required  ),
      'start_date': new FormControl({value:this.existEvent.start_date , disabled: true}, Validators.required),
      'attendees_number': new FormControl(this.existEvent.attendees_number, Validators.required),
    });

    // Create map with exist event coordinate
    this.createMap() ;
  }


  updateDescription(){
    this.spinnerService.activate() ;
    let event : Event = this.descriptionForm.value ;
    // Create new coordinate with same id and new coordinates
    let new_coordinate = new Coordinate() ;
    new_coordinate.latitude = this.marker.getLatLng().lat ;
    new_coordinate.longitude= this.marker.getLatLng().lng;
    new_coordinate.id_coordinate = this.existEvent.coordinate.id_coordinate ;

    event.event_id = this.existEvent.event_id ;
    event.coordinate = new_coordinate ;
    event.start_date = this.existEvent.start_date ;
    event.end_date = this.existEvent.end_date ;

    this.eventService.putEvent(event).subscribe(
      (res : Event ) => {

        // Update exist event ( no need for update in service because it is a reference type )
        this.existEvent.name = res.name ;
        this.existEvent.description = res.description ;
        this.existEvent.attendees_number = res.attendees_number ;
        this.existEvent.coordinate.latitude = this.marker.getLatLng().lat ;
        this.existEvent.coordinate.longitude= this.marker.getLatLng().lng;
        this.notificationService.openSnackBar('Event Updated successfully' , 'green-snackbar');
        this.spinnerService.deactivate() ;
      },
      err => {
        console.log(err);
        this.notificationService.openSnackBar('Error when updating event' , 'red-snackbar') ;
        this.spinnerService.deactivate() ;
      }
    )
  }

  createMap() {
    let coordinate ;
    if(this.existEvent){
      coordinate = {
        lat: this.existEvent.coordinate.latitude,
        lng: this.existEvent.coordinate.longitude
      }
    }
    else{
      coordinate = {
        // Tunis coordinate
        lat: 36.786967,
        lng: 10.184326,
      }
    }

    const zoomLevel = 10;
    this.map = L.map('map', {
      center: [coordinate.lat, coordinate.lng],
      zoom: zoomLevel
    });
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(this.map);

    this.map.addEventListener('click' , (e) => this.setMarkerCoordinate(e))

    this.marker = L.marker([coordinate.lat, coordinate.lng], { icon: this.smallIcon });
    this.marker.addTo(this.map)
  }

  setMarkerCoordinate(event :any){
    this.marker.setLatLng([event.latlng.lat, event.latlng.lng])
  }

}
